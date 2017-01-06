import { observer } from 'binary-common-utils/lib/observer'
import CustomApi from 'binary-common-utils/lib/customApi'
import { getToken } from 'binary-common-utils/lib/storageManager'
import { getUTCTime } from 'binary-common-utils/lib/tools'
import _ from 'underscore'
import PurchaseCtrl from './purchaseCtrl'
import _Symbol from './symbol'
import { translate } from '../../common/i18n'
import { number as expectNumber, barrierOffset as expectBarrierOffset } from '../../common/expect'

const decorateTradeOptions = (tradeOption, otherOptions = {}) => {
  const option = {
    duration_unit: tradeOption.duration_unit,
    basis: tradeOption.basis,
    currency: tradeOption.currency,
    symbol: tradeOption.symbol,
    ...otherOptions,
  }
  option.duration = expectNumber('duration', tradeOption.duration)
  option.amount = expectNumber('amount', tradeOption.amount).toFixed(2)
  if ('prediction' in tradeOption) {
    option.barrier = expectNumber('prediction', tradeOption.prediction)
  }
  if ('barrierOffset' in tradeOption) {
    option.barrier = expectBarrierOffset(tradeOption.barrierOffset)
  }
  if ('secondBarrierOffset' in tradeOption) {
    option.barrier2 = expectBarrierOffset(tradeOption.secondBarrierOffset)
  }
  return option
}

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

let sessionRuns = 0
let sessionProfit = 0

export default class Bot {
  constructor(api = null) {
    this.ticks = []
    this.candles = []
    this.currentCandleInterval = 0
    this.currentToken = ''
    this.balanceStr = ''
    this.currentSymbol = ''
    this.unregisterOnFinish = []
    this.totalProfit = 0
    this.totalRuns = 0
    this.totalWins = 0
    this.totalLosses = 0
    this.totalStake = 0
    this.totalPayout = 0
    this.balance = 0
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
  start(...args) {
    const [token, tradeOption, beforePurchase, duringPurchase, afterPurchase, sameTrade, tickAnalysisList = [], limitations = {}] = args
    this.startArgs = args
    this.limitations = limitations
    if (!this.purchaseCtrl) {
      this.afterPurchase = afterPurchase
      this.purchaseCtrl = new PurchaseCtrl(this.api, beforePurchase, duringPurchase)
      this.tickAnalysisList = tickAnalysisList
      this.tradeOption = tradeOption
      observer.emit('log.bot.start', {
        again: !!sameTrade,
      })
      const accountName = getToken(token).account_name
      if (typeof amplitude !== 'undefined') {
        amplitude.getInstance().setUserId(accountName)
      }
      if (typeof trackJs !== 'undefined') {
        trackJs.configure({
          userId: accountName,
        })
      }
      if (sameTrade) {
        this.startTrading()
      } else {
        sessionRuns = sessionProfit = 0
        const promises = []
        if (!_.isEmpty(this.tradeOption)) {
          if (this.tradeOption.symbol !== this.currentSymbol) {
            observer.unregisterAll('api.ohlc')
            observer.unregisterAll('api.tick')
            promises.push(this.subscribeToTickHistory())
            promises.push(this.subscribeToCandles())
          } else if (this.tradeOption.candleInterval !== this.currentCandleInterval) {
            observer.unregisterAll('api.ohlc')
            promises.push(this.subscribeToCandles())
          }
        }
        this.observeStreams()
        Promise.all(promises).then(() => {
          if (token !== this.currentToken) {
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
  login(token) {
    if (!observer.isRegistered('api.authorize')) {
      const apiAuthorize = () => {
        observer.emit('log.bot.login', {
          token,
        })

        this.subscribeToBalance()
        this.startTrading()
      }
      observer.register('api.authorize', apiAuthorize)
    }
    this.currentToken = token
    this.api.authorize(token)
  }
  setTradeOptions() {
    this.tradeOptions = []
    if (!_.isEmpty(this.tradeOption)) {
      this.pip = this.symbol.activeSymbols.getSymbols()[this.tradeOption.symbol.toLowerCase()].pip
      for (const type of JSON.parse(this.tradeOption.contractTypes)) {
        this.tradeOptions.push(decorateTradeOptions(this.tradeOption, {
          contract_type: type,
        }))
      }
    }
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
    }).then(() => this.api.balance())
  }
  subscribeToCandles() {
    return new Promise((resolve) => {
      const apiCandles = (candles) => {
        this.observeOhlc()
        this.currentCandleInterval = this.tradeOption.candleInterval
        this.candles = candles
        resolve()
      }
      observer.register('api.candles', apiCandles, true, {
        type: 'candles',
        unregister: ['api.ohlc', 'api.candles', 'api.tick', 'bot.tickUpdate'],
      })
      this.api.originalApi.unsubscribeFromAllCandles().then(() => 0, () => 0)
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
        this.observeTicks()
        this.currentSymbol = this.tradeOption.symbol
        this.ticks = history
        resolve()
      }
      observer.register('api.history', apiHistory, true, {
        type: 'history',
        unregister: [['api.history', apiHistory], 'api.tick',
          'bot.tickUpdate', 'api.ohlc', 'api.candles'],
      }, true)
      this.api.originalApi.unsubscribeFromAllTicks().then(() => 0, () => 0)
      this.api.history(this.tradeOption.symbol, {
        end: 'latest',
        count: 5000,
        subscribe: 1,
      })
    })
  }
  observeTicks() {
    if (!observer.isRegistered('api.tick')) {
      const apiTick = (tick) => {
        this.ticks = [...this.ticks, tick]
        this.ticks.splice(0, 1)
        let direction = ''
        const length = this.ticks.length
        const tick1 = this.ticks.slice(-1)[0]
        const tick2 = this.ticks.slice(-2)[0]
        if (length >= 2) {
          if (tick1.quote > tick2.quote) {
            direction = 'rise'
          }
          if (tick1.quote < tick2.quote) {
            direction = 'fall'
          }
        }
        const ticks = {
          symbol: this.currentSymbol,
          direction,
          pipSize: Number(Number(this.pip).toExponential().substring(3)),
          ticks: this.ticks,
          ohlc: this.candles,
        }
        for (const tickAnalysis of this.tickAnalysisList) {
          tickAnalysis.call({
            ticks,
          })
        }
        if (this.purchaseCtrl) {
          this.purchaseCtrl.updateTicks(ticks)
        }
        observer.emit('bot.tickUpdate', ticks)
      }
      observer.register('api.tick', apiTick)
    }
  }
  observeOhlc() {
    if (!observer.isRegistered('api.ohlc')) {
      const apiOHLC = (candle) => {
        if (this.candles.length && this.candles.slice(-1)[0].epoch === candle.epoch) {
          this.candles = [...this.candles.slice(0, -1), candle]
        } else {
          this.candles = [...this.candles, candle]
          this.candles.splice(0, 1)
        }
      }
      observer.register('api.ohlc', apiOHLC)
    }
  }
  observeTradeUpdate() {
    if (!observer.isRegistered('purchase.tradeUpdate')) {
      const beforePurchaseTradeUpdate = (contract) => {
        if (this.purchaseCtrl) {
          observer.emit('bot.tradeUpdate', contract)
        }
      }
      observer.register('purchase.tradeUpdate', beforePurchaseTradeUpdate)
    }
  }
  observeStreams() {
    this.observeTradeUpdate()
    this.observeTicks()
    this.observeOhlc()
  }
  subscribeProposals() {
    this.setTradeOptions()
    observer.unregisterAll('api.proposal')
    if (this.purchaseCtrl) {
      this.purchaseCtrl.setNumOfProposals(this.tradeOptions.length)
    }
    const apiProposal = (proposal) => {
      if (this.purchaseCtrl) {
        observer.emit('log.bot.proposal', proposal)
        this.purchaseCtrl.updateProposal(proposal)
      }
    }
    observer.register('api.proposal', apiProposal, false)
    this.unregisterOnFinish.push(['api.proposal', apiProposal])
    this.api.originalApi.unsubscribeFromAllProposals().then(() => {
      for (const tradeOption of this.tradeOptions) {
        this.api.proposal(tradeOption)
      }
    }, () => 0)
  }
  waitForBeforePurchaseFinish() {
    const beforePurchaseFinish = (contract) => {
      this.botFinish(contract)
    }
    observer.register('purchase.finish', beforePurchaseFinish, true, null, true)
    this.unregisterOnFinish.push(['purchase.finish', beforePurchaseFinish])
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
    this.unregisterOnFinish.push(['trade.purchase', tradePurchase])
  }
  startTrading() {
    this.waitForBeforePurchaseFinish()
    this.waitForTradePurchase()
    this.subscribeProposals()
  }
  updateTotals(contract) {
    const profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2)
    const user = getToken(this.currentToken)
    observer.emit('log.revenue', {
      user,
      profit,
      contract,
    })

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
  botFinish(finishedContract) {
    for (const obs of this.unregisterOnFinish) {
      observer.unregisterAll(...obs)
    }
    this.unregisterOnFinish = []
    this.updateTotals(finishedContract)
    observer.emit('bot.finish', finishedContract)
    this.purchaseCtrl.destroy()
    this.purchaseCtrl = null
    this.tradeAgain(finishedContract)
  }
  stop(contract) {
    if (!this.purchaseCtrl) {
      observer.emit('bot.stop', contract)
      return
    }
    for (const obs of this.unregisterOnFinish) {
      observer.unregisterAll(...obs)
    }
    this.unregisterOnFinish = []
    if (this.purchaseCtrl) {
      this.purchaseCtrl.destroy()
      this.purchaseCtrl = null
    }
    this.api.originalApi.unsubscribeFromAllProposals().then(() => 0, () => 0)
    if (contract) {
      observer.emit('log.bot.stop', contract)
    }
    observer.emit('bot.stop', contract)
  }
}

export const bot = process.browser ? new Bot() : null
