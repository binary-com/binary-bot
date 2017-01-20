import { observer } from 'binary-common-utils/lib/observer'
import CustomApi from 'binary-common-utils/lib/customApi'
import Context from './Context'
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

export default class Bot {
  constructor(api = null) {
    this.ticks = []
    this.ohlc = []
    this.token = this.balanceStr = this.symbol = ''
    this.candleInterval = this.totalProfit = this.totalRuns =
    this.totalWins = this.totalLosses = this.totalStake =
    this.sessionRuns = this.sessionProfit = this.totalPayout =
    this.balance = 0
    this.pipSize = 2
    this.api = (api === null) ? new CustomApi() : api
    this.symbolApi = new _Symbol(this.api)
    this.initPromise = this.symbolApi.initPromise
  }
  shouldRestartOnError() {
    return this.tradeOption && this.tradeOption.restartOnError
  }
  restartOnError() {
    if (this.shouldRestartOnError()) {
      this.start(...this.startArgs)
    }
  }
  getPipSize() {
    const symbols = this.symbolApi.activeSymbols.getSymbols()

    return +(+symbols[this.tradeOption.symbol.toLowerCase()].pip)
      .toExponential().substring(3)
  }
  registerStream(name, cb) {
    if (isRegistered(name)) {
      return
    }
    observer.register(name, cb)
  }
  handleOhlcStream(candle) {
    const length = this.ohlc.length
    const prevCandles = length && this.ohlc[length - 1].epoch === candle.epoch ?
      this.ohlc.slice(0, -1) :
      this.ohlc.slice(1)
    this.ohlc = [...prevCandles, candle]
  }
  handleTradeUpdate(contract) {
    if (this.purchaseCtrl) {
      observer.emit('bot.tradeUpdate', contract)
    }
  }
  handleAuthStream() {
    observer.emit('log.bot.login', { token: this.token })

    this.subscribeToBalance()
    this.startTrading()
  }
  handleTickStream(tick) {
    this.ticks = [...this.ticks.slice(1), tick]

    const {
      direction = getDirection(this.ticks),
      symbol, pipSize, ticks, ohlc,
    } = this

    const ticksObj = { direction, symbol, pipSize, ticks, ohlc }

    this.context.createTicks(ticksObj)
    this.context.tickAnalysis()

    if (this.purchaseCtrl) {
      this.purchaseCtrl.updateTicks(ticksObj)
    }

    observer.emit('bot.tickUpdate', ticksObj)
  }
  observeStreams() {
    this.registerStream('api.authorize', () => this.handleAuthStream())
    this.registerStream('api.ohlc', candle => this.handleOhlcStream(candle))
    this.registerStream('api.tick', tick => this.handleTickStream(tick))
    this.registerStream('purchase.tradeUpdate', contract => this.handleTradeUpdate(contract))
  }
  subscriptionsBeforeStart() {
    const isNewSymbol = this.tradeOption.symbol !== this.symbol
    const isNewCandleInterval = this.tradeOption.candleInterval !== this.candleInterval

    return [isNewSymbol ? this.subscribeToTickHistory() : null,
      (isNewCandleInterval || isNewSymbol) ? this.subscribeToCandles() : null]
  }
  loginAndStartTrading(token) {
    this.sessionRuns = this.sessionProfit = 0

    const promises = this.subscriptionsBeforeStart()

    this.observeStreams()

    Promise.all(promises).then(() => this.login(token))
      .catch((e) => {
        if (e.name !== 'BlocklyError') {
          throw e
        }
      })
  }
  start(...args) {
    const [
      token, tradeOption, beforePurchase, duringPurchase,
      afterPurchase, sameTrade, tickAnalysisList, limitations,
    ] = this.startArgs = args

    this.context = new Context(
      beforePurchase, duringPurchase, afterPurchase, tickAnalysisList)

    if (!this.purchaseCtrl) {
      this.tradeOption = tradeOption
      this.limitations = limitations || {}

      this.purchaseCtrl = new PurchaseCtrl(this.api, this.context)

      this.pipSize = this.getPipSize()

      observer.emit('log.bot.start', { again: !!sameTrade })

      if (sameTrade) {
        this.startTrading()
      } else {
        this.loginAndStartTrading(token)
      }
    }
  }
  login(token) {
    if (token === this.token) {
      this.startTrading()
      return
    }
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
  subscribeToStream(
    name, respHandler, request, registerOnce, type, unregister
  ) {
    return new Promise((resolve) => {
      observer.register(
        name, (...args) => {
          respHandler(...args)
          resolve()
        }, registerOnce, type && { type, unregister }, true)
      request()
    })
  }
  subscribeToBalance() {
    this.subscribeToStream(
      'api.balance', balanceResp => {
        const { balance, currency } = balanceResp
        this.balance = +balance
        this.balanceStr = `${(+balance).toFixed(2)} ${currency}`
        observer.emit('bot.tradeInfo', { balance: this.balanceStr })
      }, () => this.api.originalApi.send({ forget_all: 'balance' })
      .then(() => this.api.balance(), noop), false, null
    )
  }
  subscribeToCandles() {
    return this.subscribeToStream(
      'api.candles', ohlc => {
        this.candleInterval = this.tradeOption.candleInterval
        this.ohlc = ohlc
      }, () => {
        this.api.originalApi.unsubscribeFromAllCandles().then(noop, noop)
        this.api.history(this.tradeOption.symbol, {
          end: 'latest',
          count: 5000,
          granularity: this.tradeOption.candleInterval,
          style: 'candles',
          subscribe: 1,
        })
      }, true, 'candles', ['api.ohlc', 'api.candles']
    )
  }
  subscribeToTickHistory() {
    return this.subscribeToStream(
      'api.history', history => {
        this.symbol = this.tradeOption.symbol
        this.ticks = history
      }, () => {
        this.api.originalApi.unsubscribeFromAllTicks().then(noop, noop)
        this.api.history(this.tradeOption.symbol, {
          end: 'latest',
          count: 5000,
          subscribe: 1,
        })
      }, true, 'history', ['api.history', 'api.tick', 'bot.tickUpdate']
    )
  }
  subscribeToProposals() {
    this.subscribeToStream(
      'api.proposal', proposal => {
        if (this.purchaseCtrl) {
          observer.emit('log.bot.proposal', proposal)
          this.purchaseCtrl.updateProposal(proposal)
        }
      }, () => {
        const proposals = this.genProposals()

        if (this.purchaseCtrl) {
          this.purchaseCtrl.setNumOfProposals(proposals.length)
        }
        this.api.originalApi.unsubscribeFromAllProposals()
          .then(() => proposals.forEach(p => this.api.proposal(p)), noop)
      }, false, null
    )
  }
  subscribeToPurchaseFinish() {
    this.subscribeToStream(
      'purchase.finish', contract => this.botFinish(contract),
      noop, true, null
    )
  }
  subscribeToTradePurchase() {
    this.subscribeToStream(
      'trade.purchase', info => {
        this.totalRuns += 1
        this.sessionRuns += 1
        observer.emit('bot.tradeInfo', {
          totalRuns: this.totalRuns,
          transaction_ids: { buy: info.purchasedContract.transaction_id },
          contract_type: info.contract.contract_type,
          buy_price: info.purchasedContract.buy_price,
        })
      }, noop, true, null
    )
  }
  startTrading() {
    this.subscribeToPurchaseFinish()
    this.subscribeToTradePurchase()
    this.subscribeToProposals()
  }
  updateTotals(contract) {
    const profit = +(Number(contract.sell_price) - Number(contract.buy_price)).toFixed(2)
    if (+profit > 0) {
      this.totalWins += 1
    } else if (+profit < 0) {
      this.totalLosses += 1
    }
    this.sessionProfit = +(this.sessionProfit + profit).toFixed(2)
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
  limitsReached() {
    const { maxLoss, maxTrades } = this.limitations
    if (maxLoss && maxTrades) {
      if (this.sessionRuns >= maxTrades) {
        observer.emit('LimitsReached', translate('Maximum number of trades reached'))
        return true
      }
      if (this.sessionProfit <= (-maxLoss)) {
        observer.emit('LimitsReached', translate('Maximum loss amount reached'))
        return true
      }
    }
    return false
  }
  tradeAgain(finishedContract) {
    if (!this.limitsReached()) {
      this.context.afterPurchase(finishedContract)
    }
  }
  destroyPurchaseCtrl() {
    if (this.purchaseCtrl) {
      this.purchaseCtrl.destroy()
      this.purchaseCtrl = null
    }
  }
  botFinish(finishedContract) {
    this.updateTotals(finishedContract)
    observer.emit('bot.finish', finishedContract)
    this.destroyPurchaseCtrl()
    this.tradeAgain(finishedContract)
  }
  stop(contract) {
    this.destroyPurchaseCtrl()
    this.api.originalApi.unsubscribeFromAllProposals().then(noop, noop)
    observer.emit('bot.stop', contract)
  }
}

export const bot = process.browser ? new Bot() : null
