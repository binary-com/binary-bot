import { observer } from 'binary-common-utils/lib/observer'
import CustomApi from 'binary-common-utils/lib/customApi'
import { getUTCTime } from 'binary-common-utils/lib/tools'
import PurchaseCtrl from './purchaseCtrl'
import _Symbol from './symbol'
import { translate } from '../../common/i18n'
import { number as expectNumber, barrierOffset as expectBarrierOffset } from '../../common/expect'

const noop = e => e

const tradeOptionToProposal = (tradeOption, otherOptions) =>
  Object.assign(
    {
      duration_unit: tradeOption.duration_unit,
      basis: tradeOption.basis,
      currency: tradeOption.currency,
      symbol: tradeOption.symbol,
      duration: expectNumber('duration', tradeOption.duration),
      amount: expectNumber('amount', tradeOption.amount).toFixed(2),
    },
    'prediction' in tradeOption && {
      barrier: expectNumber('prediction', tradeOption.prediction),
    },
    'barrierOffset' in tradeOption && {
      barrier: expectBarrierOffset(tradeOption.barrierOffset),
    },
    'secondBarrierOffset' in tradeOption && {
      barrier2: expectBarrierOffset(tradeOption.secondBarrierOffset),
    },
    otherOptions,
  )

const createDetails = (contract) => {
  const profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2)
  const result = (profit < 0) ? 'loss' : 'win'

  observer.emit(`log.purchase.${result}`, {
    profit,
    transactionId: contract.transaction_ids.buy,
  })
  return [
    contract.transaction_ids.buy, +contract.buy_price, +contract.sell_price,
    profit, contract.contract_type,
    getUTCTime(new Date(parseInt(`${contract.entry_tick_time}000`, 10))), +contract.entry_tick,
    getUTCTime(new Date(parseInt(`${contract.exit_tick_time}000`, 10))), +contract.exit_tick,
    +((contract.barrier) ? contract.barrier : 0), result,
  ]
}

const isRegistered = name => observer.isRegistered(name)

const getDirection = ticks => {
  const length = ticks.length
  const [tick1, tick2] = ticks.slice(-2)
  let direction = ''

  if (length >= 2) {
    direction = tick1.quote > tick2.quote ? 'rise' : direction
    direction = tick1.quote < tick2.quote ? 'fall' : direction
  }
  return direction
}

let sessionRuns = 0
let sessionProfit = 0

export default class Bot {
  constructor(api = null) {
    this.ticks = []
    this.ohlc = []
    this.candleInterval = 0
    this.token = ''
    this.balanceStr = ''
    this.currentSymbol = ''
    this.unregisterOnFinishList = []
    this.totalProfit = 0
    this.totalRuns = 0
    this.totalWins = 0
    this.totalLosses = 0
    this.totalStake = 0
    this.totalPayout = 0
    this.balance = 0
    this.pipSize = 2
    this.api = (api === null) ? new CustomApi() : api
    this.symbol = new _Symbol(this.api)
    this.initPromise = this.symbol.initPromise
    this.shouldRestartOnError = () => this.tradeOption && this.tradeOption.restartOnError
    this.restartOnError = () => {
      if (this.shouldRestartOnError()) {
        this.start(...this.startArgs)
      }
    }
  }
  getPipSize(symbols, symbolName) {
    return +(+symbols[symbolName.toLowerCase()].pip)
      .toExponential().substring(3)
  }
  start(...args) {
    const [
      token, tradeOption, beforePurchase, duringPurchase,
      afterPurchase, sameTrade, tickAnalysisList, limitations,
    ] = args

    this.startArgs = args
    this.limitations = limitations || {}
    if (!this.purchaseCtrl) {
      this.afterPurchase = afterPurchase
      this.purchaseCtrl = new PurchaseCtrl(this.api, beforePurchase, duringPurchase)
      this.tickAnalysisList = tickAnalysisList || []
      this.tradeOption = tradeOption
      this.pipSize = this.getPipSize(
        this.symbol.activeSymbols.getSymbols(),
        this.tradeOption.symbol
      )
      observer.emit('log.bot.start', {
        again: !!sameTrade,
      })
      if (sameTrade) {
        this.startTrading()
      } else {
        sessionRuns = sessionProfit = 0
        const newSymbol = this.tradeOption.symbol !== this.currentSymbol
        const newCandleInterval = this.tradeOption.candleInterval !== this.candleInterval

        const promises = [
          newSymbol ? this.subscribeToTickHistory() : null,
          (newCandleInterval || newSymbol) ? this.subscribeToCandles() : null,
        ]

        this.observeStreams()
        Promise.all(promises).then(() => {
          if (token !== this.token) {
            this.login(token)
          } else {
            this.startTrading()
          }
        }).catch((error) => {
          if (error.name === 'BlocklyError') {
            // pass
          } else {
            throw error
          }
        })
      }
    }
  }
  observeLogin(token) {
    if (isRegistered('api.authorize')) {
      return
    }
    const apiAuthorize = () => {
      observer.emit('log.bot.login', { token })

      this.subscribeToBalance()
      this.startTrading()
    }
    observer.register('api.authorize', apiAuthorize)
  }
  login(token) {
    this.observeLogin(token)
    this.token = token
    this.api.authorize(token)
  }
  getContractTypes() {
    return JSON.parse(this.tradeOption.contractTypes)
  }
  genProposals() {
    return this.getContractTypes().map(type =>
      tradeOptionToProposal(this.tradeOption, {
        contract_type: type,
      })
    )
  }
  subscribeToBalance() {
    const apiBalance = (balance) => {
      this.balance = balance.balance
      this.balanceStr = `${Number(balance.balance).toFixed(2)} ${balance.currency}`
      observer.emit('bot.tradeInfo', {
        balance: this.balanceStr,
      })
    }
    observer.register('api.balance', apiBalance, false, {
      type: 'balance',
      unregister: [['api.balance', apiBalance]],
    })
    this.api.originalApi.send({
      forget_all: 'balance',
    }).then(() => this.api.balance(), noop)
  }
  subscribeToCandles() {
    return new Promise((resolve) => {
      const apiCandles = (ohlc) => {
        this.candleInterval = this.tradeOption.candleInterval
        this.ohlc = ohlc
        resolve()
      }
      observer.unregisterAll('api.ohlc')
      observer.register('api.candles', apiCandles, true, {
        type: 'candles',
        unregister: ['api.ohlc', 'api.candles', 'api.tick', 'bot.tickUpdate'],
      })
      this.api.originalApi.unsubscribeFromAllCandles().then(noop, noop)
      this.api.history(this.tradeOption.symbol, {
        end: 'latest',
        count: 5000,
        granularity: this.tradeOption.candleInterval,
        style: 'candles',
        subscribe: 1,
      })
    })
  }
  subscribeToTickHistory() {
    return new Promise((resolve) => {
      const apiHistory = (history) => {
        this.currentSymbol = this.tradeOption.symbol
        this.ticks = history
        resolve()
      }
      observer.unregisterAll('api.tick')
      observer.register('api.history', apiHistory, true, {
        type: 'history',
        unregister: [['api.history', apiHistory], 'api.tick',
          'bot.tickUpdate', 'api.ohlc', 'api.candles'],
      }, true)
      this.api.originalApi.unsubscribeFromAllTicks().then(noop, noop)
      this.api.history(this.tradeOption.symbol, {
        end: 'latest',
        count: 5000,
        subscribe: 1,
      })
    })
  }
  observeTicks() {
    if (isRegistered('api.tick')) {
      return
    }
    const apiTick = (tick) => {
      this.ticks = [...this.ticks.slice(1), tick]

      const ticks = {
        direction: getDirection(this.ticks),
        symbol: this.currentSymbol,
        pipSize: this.pipSize,
        ticks: this.ticks,
        ohlc: this.ohlc,
      }

      this.tickAnalysisList.forEach(ta => ta.call({ ticks }))

      if (this.purchaseCtrl) {
        this.purchaseCtrl.updateTicks(ticks)
      }
      observer.emit('bot.tickUpdate', ticks)
    }
    observer.register('api.tick', apiTick)
  }
  observeOhlc() {
    if (isRegistered('api.ohlc')) {
      return
    }
    const apiOHLC = (candle) => {
      const length = this.ohlc.length
      const prevCandles = length && this.ohlc[length - 1].epoch === candle.epoch ?
        this.ohlc.slice(0, -1) :
        this.ohlc.slice(1)
      this.ohlc = [...prevCandles, candle]
    }
    observer.register('api.ohlc', apiOHLC)
  }
  observeTradeUpdate() {
    if (isRegistered('purchase.tradeUpdate')) {
      return
    }
    const beforePurchaseTradeUpdate = (contract) => {
      if (this.purchaseCtrl) {
        observer.emit('bot.tradeUpdate', contract)
      }
    }
    observer.register('purchase.tradeUpdate', beforePurchaseTradeUpdate)
  }
  observeStreams() {
    this.observeTradeUpdate()
    this.observeTicks()
    this.observeOhlc()
  }
  subscribeProposals() {
    const proposals = this.genProposals()
    observer.unregisterAll('api.proposal')
    if (this.purchaseCtrl) {
      this.purchaseCtrl.setNumOfProposals(proposals.length)
    }
    const apiProposal = (proposal) => {
      if (this.purchaseCtrl) {
        observer.emit('log.bot.proposal', proposal)
        this.purchaseCtrl.updateProposal(proposal)
      }
    }
    observer.register('api.proposal', apiProposal, false)
    this.unregisterOnFinishList.push(['api.proposal', apiProposal])
    this.api.originalApi.unsubscribeFromAllProposals().then(() =>
      proposals.forEach(p => this.api.proposal(p))
    , noop)
  }
  waitForBeforePurchaseFinish() {
    const beforePurchaseFinish = (contract) => {
      this.botFinish(contract)
    }
    observer.register('purchase.finish', beforePurchaseFinish, true, null, true)
    this.unregisterOnFinishList.push(['purchase.finish', beforePurchaseFinish])
  }
  waitForTradePurchase() {
    const tradePurchase = (info) => {
      this.totalRuns += 1
      sessionRuns += 1
      observer.emit('bot.tradeInfo', {
        totalRuns: this.totalRuns,
        transaction_ids: {
          buy: info.purchasedContract.transaction_id,
        },
        contract_type: info.contract.contract_type,
        buy_price: info.purchasedContract.buy_price,
      })
    }
    observer.register('trade.purchase', tradePurchase, true, null, true)
    this.unregisterOnFinishList.push(['trade.purchase', tradePurchase])
  }
  startTrading() {
    this.waitForBeforePurchaseFinish()
    this.waitForTradePurchase()
    this.subscribeProposals()
  }
  updateTotals(contract) {
    const profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2)
    if (+profit > 0) {
      this.totalWins += 1
    } else if (+profit < 0) {
      this.totalLosses += 1
    }
    sessionProfit = +(sessionProfit + profit).toFixed(2)
    this.totalProfit = +(this.totalProfit + profit).toFixed(2)
    this.totalStake = +(this.totalStake + Number(contract.buy_price)).toFixed(2)
    this.totalPayout = +(this.totalPayout + Number(contract.sell_price)).toFixed(2)

    observer.emit('bot.tradeInfo', {
      profit,
      contract,
      totalProfit: this.totalProfit,
      totalWins: this.totalWins,
      totalLosses: this.totalLosses,
      totalStake: this.totalStake,
      totalPayout: this.totalPayout,
    })
  }
  tradeAgain(finishedContract) {
    const { maxLoss, maxTrades } = this.limitations
    if (maxLoss && maxTrades) {
      if (sessionRuns >= maxTrades) {
        observer.emit('LimitsReached', translate('Maximum number of trades reached'))
        return
      }
      if (sessionProfit <= (-maxLoss)) {
        observer.emit('LimitsReached', translate('Maximum loss amount reached'))
        return
      }
    }
    const afterPurchaseContext = {
      finishedContract,
      contractDetails: createDetails(finishedContract),
    }
    this.afterPurchase.call(afterPurchaseContext)
  }
  unregisterOnFinish() {
    this.unregisterOnFinishList.forEach(o =>
      observer.unregisterAll(...o)
    )
    this.unregisterOnFinishList = []
  }
  destroyPurchaseCtrl() {
    if (this.purchaseCtrl) {
      this.purchaseCtrl.destroy()
      this.purchaseCtrl = null
    }
  }
  botFinish(finishedContract) {
    this.unregisterOnFinish()
    this.updateTotals(finishedContract)
    observer.emit('bot.finish', finishedContract)
    this.destroyPurchaseCtrl()
    this.tradeAgain(finishedContract)
  }
  stop(contract) {
    this.unregisterOnFinish()
    this.destroyPurchaseCtrl()
    this.api.originalApi.unsubscribeFromAllProposals().then(noop, noop)
    observer.emit('bot.stop', contract)
  }
}

export const bot = process.browser ? new Bot() : null
