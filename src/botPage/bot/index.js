import { observer } from 'binary-common-utils/lib/observer'
import CustomApi from 'binary-common-utils/lib/customApi'
import Context from './Context'
import PurchaseCtrl from './purchaseCtrl'
import _Symbol from './symbol'
import { translate } from '../../common/i18n'
import {
  noop, subscribeToStream, registerStream,
  getDirection, tradeOptionToProposal,
} from './tools'

export default class Bot {
  constructor(api = null) {
    this.ticks = []
    this.ohlc = []
    this.token = ''
    this.balanceStr = ''
    this.symbol = ''
    this.candleInterval = 0
    this.totalProfit = 0
    this.totalRuns = 0
    this.totalWins = 0
    this.totalLosses = 0
    this.totalStake = 0
    this.totalPayout = 0
    this.sessionRuns = 0
    this.sessionProfit = 0
    this.running = false
    this.balance = 0
    this.pipSize = 2
    this.api = (api === null) ? new CustomApi(observer) : api
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
  handleOhlcStream(candle) {
    const length = this.ohlc.length
    const prevCandles = length && this.ohlc[length - 1].epoch === candle.epoch ?
      this.ohlc.slice(0, -1) :
      this.ohlc.slice(1)
    this.ohlc = [...prevCandles, candle]
  }
  handleTradeUpdate(contract) {
    if (this.running) {
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

    this.purchaseCtrl.updateTicks(ticksObj)

    observer.emit('bot.tickUpdate', ticksObj)
  }
  observeStreams() {
    registerStream('api.authorize', () => this.handleAuthStream())
    registerStream('api.ohlc', candle => this.handleOhlcStream(candle))
    registerStream('api.tick', tick => this.handleTickStream(tick))
    registerStream('purchase.tradeUpdate', contract => this.handleTradeUpdate(contract))
  }
  subscriptionsBeforeStart() {
    const isNewSymbol = this.tradeOption.symbol !== this.symbol
    const isNewCandleInterval = this.tradeOption.candleInterval !== this.candleInterval

    return [isNewSymbol ? this.subscribeToTickHistory() : null,
      (isNewCandleInterval || isNewSymbol) ? this.subscribeToCandles() : null]
  }
  loginAndStartTrading(token) {
    const promises = this.subscriptionsBeforeStart()

    this.observeStreams()

    Promise.all(promises).then(() => this.login(token))
      .catch((e) => {
        if (e.name !== 'BlocklyError') {
          throw e
        }
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
  start(...args) {
    const [
      token, tradeOption, beforePurchase, duringPurchase,
      afterPurchase, sameTrade, tickAnalysisList, limitations,
    ] = args

    this.startArgs = args

    this.context = new Context(
      beforePurchase, duringPurchase, afterPurchase, tickAnalysisList)

    this.limitations = limitations || {}

    if (!sameTrade) {
      this.sessionRuns = 0
      this.sessionProfit = 0
    }

    if (this.limitsReached()) {
      this.stop()
      return
    }

    this.tradeOption = tradeOption

    this.purchaseCtrl = new PurchaseCtrl(this.api, this.context)

    this.pipSize = this.getPipSize()

    observer.emit('log.bot.start', { again: !!sameTrade })

    if (sameTrade) {
      this.startTrading()
    } else {
      this.running = true
      this.loginAndStartTrading(token)
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
      }))
  }
  subscribeToBalance() {
    subscribeToStream(
      'api.balance', balanceResp => {
        const { balance, currency } = balanceResp
        this.balance = +balance
        this.balanceStr = `${(+balance).toFixed(2)} ${currency}`
        observer.emit('bot.tradeInfo', { balance: this.balanceStr })
      }, () => this.api.originalApi.send({ forget_all: 'balance' })
      .then(() => this.api.balance(), noop), false, null)
  }
  subscribeToCandles() {
    return subscribeToStream(
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
      }, true, 'candles', ['api.ohlc', 'api.candles'])
  }
  subscribeToTickHistory() {
    return subscribeToStream(
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
      }, true, 'history', ['api.history', 'api.tick', 'bot.tickUpdate'])
  }
  subscribeToProposals() {
    subscribeToStream(
      'api.proposal', proposal => {
        if (this.running) {
          observer.emit('log.bot.proposal', proposal)
          this.purchaseCtrl.updateProposal(proposal)
        }
      }, () => {
        const proposals = this.genProposals()

        this.purchaseCtrl.setNumOfProposals(proposals.length)
        this.api.originalApi.unsubscribeFromAllProposals()
          .then(() => proposals.forEach(p => this.api.proposal(p)), noop)
      }, false, null)
  }
  subscribeToPurchaseFinish() {
    subscribeToStream(
      'purchase.finish', contract => this.botFinish(contract),
      noop, true, null)
  }
  subscribeToTradePurchase() {
    subscribeToStream(
      'trade.purchase', info => {
        this.totalRuns += 1
        this.sessionRuns += 1
        observer.emit('bot.tradeInfo', {
          totalRuns: this.totalRuns,
          transaction_ids: { buy: info.purchasedContract.transaction_id },
          contract_type: info.contract.contract_type,
          buy_price: info.purchasedContract.buy_price,
        })
      }, noop, true, null)
  }
  startTrading() {
    this.subscribeToPurchaseFinish()
    this.subscribeToTradePurchase()
    this.subscribeToProposals()
  }
  updateTotals(contract) {
    const profit = +((+contract.sell_price) - (+contract.buy_price)).toFixed(2)

    if (+profit > 0) {
      this.totalWins += 1
    } else if (+profit < 0) {
      this.totalLosses += 1
    }
    this.sessionProfit = +(this.sessionProfit + profit).toFixed(2)
    this.totalProfit = +(this.totalProfit + profit).toFixed(2)
    this.totalStake = +(this.totalStake + (+contract.buy_price)).toFixed(2)
    this.totalPayout = +(this.totalPayout + (+contract.sell_price)).toFixed(2)

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
  botFinish(finishedContract) {
    this.updateTotals(finishedContract)
    observer.emit('bot.finish', finishedContract)
    this.context.afterPurchase(finishedContract)
  }
  stop() {
    this.running = false
    this.api.originalApi.unsubscribeFromAllProposals().then(noop, noop)
    observer.emit('bot.stop')
  }
}

export const bot = process.browser ? new Bot() : null
