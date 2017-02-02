import ContextManager from './ContextManager'
import Purchase from './Purchase'
import { translate } from '../../common/i18n'
import { observer as viewObserver } from '../../common/shared'
import { noop, getDirection, tradeOptionToProposal, getPipSizes } from './tools'

export default class Bot {
  constructor($scope) {
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
    this.pipSizes = []
    this.api = $scope.api
    this.observer = $scope.observer
    this.$scope = $scope
    this.CM = new ContextManager($scope)
  }
  subscribeToStream(
    name, respHandler, request, registerOnce, type, unregister
  ) {
    return new Promise((resolve) => {
      this.observer.register(
        name, (...args) => {
          respHandler(...args)
          resolve()
        }, registerOnce, type && { type, unregister }, true)
      request()
    })
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
      viewObserver.emit('bot.tradeUpdate', contract)
    }
  }
  handleAuthStream() {
    viewObserver.emit('log.bot.login', { token: this.token })

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

    viewObserver.emit('bot.tickUpdate', ticksObj)
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
        viewObserver.emit('LimitsReached', translate('Maximum number of trades reached'))
        return true
      }
      if (this.sessionProfit <= (-maxLoss)) {
        viewObserver.emit('LimitsReached', translate('Maximum loss amount reached'))
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

    this.purchase = new Purchase(this.$scope, this.CM)

    viewObserver.emit('log.bot.start', { again: !!sameTrade })

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
    this.subscribeToStream(
      'api.balance', balanceResp => {
        const { balance, currency } = balanceResp
        this.balance = +balance
        this.balanceStr = `${(+balance).toFixed(2)} ${currency}`
        viewObserver.emit('bot.tradeInfo', { balance: this.balanceStr })
      }, () => this.api.originalApi.send({ forget_all: 'balance' })
      .then(() => this.api.balance(), noop), false, null)
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
      }, true, 'candles', ['api.ohlc', 'api.candles'])
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
      }, true, 'history', ['api.history', 'api.tick', 'bot.tickUpdate'])
  }
  subscribeToProposals() {
    this.subscribeToStream(
      'api.proposal', proposal => {
        if (this.running) {
          viewObserver.emit('log.bot.proposal', proposal)
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
    this.subscribeToStream(
      'trade.finish', contract => this.botFinish(contract),
      noop, true, null)
  }
  subscribeToTradePurchase() {
    this.subscribeToStream(
      'trade.purchase', info => {
        this.totalRuns += 1
        this.sessionRuns += 1
        viewObserver.emit('bot.tradeInfo', {
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

    viewObserver.emit('bot.tradeInfo', {
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
    viewObserver.emit('bot.finish', finishedContract)
  }
  stop() {
    this.running = false
    this.api.originalApi.unsubscribeFromAllProposals().then(noop, noop)
    viewObserver.emit('bot.stop')
  }
}
