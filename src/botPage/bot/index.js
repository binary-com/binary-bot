import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import Purchase from './Purchase'
import { translate } from '../../common/i18n'
import {
  noop, getDirection, tradeOptionToProposal, getPipSizes,
  subscribeToStream,
} from './tools'

let totalRuns = 0
let totalProfit = 0
let totalWins = 0
let totalLosses = 0
let totalStake = 0
let totalPayout = 0
let balance = 0
let balanceStr = ''

export default class Bot {
  constructor($scope) {
    this.ticks = []
    this.ohlc = []
    this.token = ''
    this.symbol = ''
    this.candleInterval = 0
    this.sessionRuns = 0
    this.sessionProfit = 0
    this.running = false
    this.pipSizes = []
    this.api = $scope.api
    this.observer = $scope.observer
    this.CM = $scope.CM
    this.$scope = $scope
  }
  registerStream(name, cb) {
    if (this.observer.isRegistered(name)) {
      return
    }
    this.observer.register(name, cb)
  }
  shouldRestartOnError() {
    return this.tradeOption && this.tradeOption.restartOnError
  }
  restartOnError() {
    if (this.shouldRestartOnError()) {
      this.start(...this.startArgs)
    }
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
      globalObserver.emit('bot.tradeUpdate', contract)
    }
  }
  handleAuthStream() {
    globalObserver.emit('log.bot.login', { token: this.token })

    this.subscribeToBalance()
    this.startTrading()
  }
  handleTickStream(tick) {
    this.ticks = [...this.ticks.slice(1), tick]

    const {
      direction = getDirection(this.ticks),
      symbol, ticks, ohlc,
    } = this

    const ticksObj = { direction, symbol, pipSize: this.pipSizes[symbol], ticks, ohlc }

    this.CM.setContext('shared', ticksObj)

    this.purchase.updateTicks(ticksObj)

    globalObserver.emit('bot.tickUpdate', ticksObj)
  }
  observeStreams() {
    this.registerStream('api.authorize', () => this.handleAuthStream())
    this.registerStream('api.ohlc', candle => this.handleOhlcStream(candle))
    this.registerStream('api.tick', tick => this.handleTickStream(tick))
    this.registerStream('trade.update', contract => this.handleTradeUpdate(contract))
  }
  getPipSizes() {
    return new Promise(resolve => {
      this.api.originalApi.getActiveSymbolsBrief().then(resp =>
        (this.pipSizes = getPipSizes(resp.active_symbols)))
      resolve()
    })
  }
  subscriptionsBeforeStart() {
    const isNewSymbol = this.tradeOption.symbol !== this.symbol
    const isNewCandleInterval = this.tradeOption.candleInterval !== this.candleInterval

    return [
      this.getPipSizes(),
      isNewSymbol ? this.subscribeToTickHistory() : null,
      (isNewCandleInterval || isNewSymbol) ? this.subscribeToCandles() : null,
    ]
  }
  loginAndStartTrading(token) {
    const promises = this.subscriptionsBeforeStart()

    this.observeStreams()

    Promise.all(promises).then(() => this.login(token))
  }
  limitsReached() {
    const { maxLoss, maxTrades } = this.limitations
    if (maxLoss && maxTrades) {
      if (this.sessionRuns >= maxTrades) {
        globalObserver.emit('LimitsReached', translate('Maximum number of trades reached'))
        return true
      }
      if (this.sessionProfit <= (-maxLoss)) {
        globalObserver.emit('LimitsReached', translate('Maximum loss amount reached'))
        return true
      }
    }
    return false
  }
  start(...args) {
    const [token, tradeOption, sameTrade, limitations] = args

    this.startArgs = args

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

    this.purchase = new Purchase(this.$scope)

    globalObserver.emit('log.bot.start', { again: !!sameTrade })

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
    subscribeToStream(this.observer,
      'api.balance', balanceResp => {
        const { balance: b, currency } = balanceResp
        balance = +b
        balanceStr = `${balance.toFixed(2)} ${currency}`
        globalObserver.emit('bot.tradeInfo', { balance: balanceStr })
      }, () => this.api.originalApi.send({ forget_all: 'balance' })
      .then(() => this.api.balance(), noop), false, null)
  }
  subscribeToCandles() {
    return subscribeToStream(this.observer,
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
    return subscribeToStream(this.observer,
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
    subscribeToStream(this.observer,
      'api.proposal', proposal => {
        if (this.running) {
          globalObserver.emit('log.bot.proposal', proposal)
          this.purchase.updateProposal(proposal)
        }
      }, () => {
        const proposals = this.genProposals()

        this.purchase.setNumOfProposals(proposals.length)
        this.api.originalApi.unsubscribeFromAllProposals()
          .then(() => proposals.forEach(p => this.api.proposal(p)), noop)
      }, false, null)
  }
  subscribeToPurchaseFinish() {
    subscribeToStream(this.observer,
      'trade.finish', contract => this.botFinish(contract),
      noop, true, null)
  }
  subscribeToTradePurchase() {
    subscribeToStream(this.observer,
      'trade.purchase', info => {
        totalRuns += 1
        this.sessionRuns += 1
        globalObserver.emit('bot.tradeInfo', {
          totalRuns,
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
      totalWins += 1
    } else if (+profit < 0) {
      totalLosses += 1
    }
    this.sessionProfit = +(this.sessionProfit + profit).toFixed(2)
    totalProfit = +(totalProfit + profit).toFixed(2)
    totalStake = +(totalStake + (+contract.buy_price)).toFixed(2)
    totalPayout = +(totalPayout + (+contract.sell_price)).toFixed(2)

    globalObserver.emit('bot.tradeInfo', {
      profit,
      contract,
      totalProfit,
      totalWins,
      totalLosses,
      totalStake,
      totalPayout,
    })
  }
  botFinish(finishedContract) {
    this.updateTotals(finishedContract)
    globalObserver.emit('bot.finish', finishedContract)
  }
  stop() {
    this.running = false
    this.api.originalApi.unsubscribeFromAllProposals().then(noop, noop)
    globalObserver.emit('bot.stop')
  }
  getTotalRuns() {
    return totalRuns
  }
  getBalance(type) {
    return type === 'STR' ? balanceStr : balance
  }
  getTotalProfit() {
    return totalProfit
  }
}
