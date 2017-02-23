import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import Purchase from './Purchase'
import { translate } from '../../common/i18n'
import { noop, subscribeToStream, registerStream, doUntilDone } from './tools'

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
    this.token = ''
    this.sessionRuns = 0
    this.sessionProfit = 0
    this.api = $scope.api
    this.observer = $scope.observer
    this.CM = $scope.CM
    this.$scope = $scope
    this.purchase = new Purchase(this.$scope)
  }
  shouldRestartOnError() {
    return this.tradeOption && this.tradeOption.restartOnError
  }
  restartOnError() {
    if (this.shouldRestartOnError()) {
      this.start(...this.startArgs)
    }
  }
  handleTradeUpdate(contract) {
    globalObserver.emit('bot.tradeUpdate', contract)
  }
  handleAuthStream() {
    this.subscribeToBalance()
    this.startTrading()
  }
  observeStreams() {
    registerStream(this.observer, 'api.authorize', () => this.handleAuthStream())
    registerStream(this.observer,
      'trade.update', contract => this.handleTradeUpdate(contract))
  }
  limitsReached() {
    const { maxLoss, maxTrades } = this.limitations
    if (maxLoss && maxTrades) {
      if (this.sessionRuns >= maxTrades) {
        globalObserver.emit('Error', translate('Maximum number of trades reached'))
        return true
      }
      if (this.sessionProfit <= (-maxLoss)) {
        globalObserver.emit('Error', translate('Maximum loss amount reached'))
        return true
      }
    }
    return false
  }
  start(...args) {
    const [token, tradeOption, limitations] = args

    this.startArgs = args

    this.limitations = limitations || {}

    this.tradeOption = tradeOption

    this.observeStreams()

    if (this.limitsReached()) {
      return
    }

    if (token === this.token) {
      this.startTrading()
    } else {
      this.sessionRuns = 0
      this.sessionProfit = 0
      this.token = token
      this.api.authorize(token)
    }
  }
  subscribeToBalance() {
    subscribeToStream(this.observer, 'api.balance',
      balanceResp => {
        const { balance: b, currency } = balanceResp
        balance = +b
        balanceStr = `${balance.toFixed(2)} ${currency}`
        globalObserver.emit('bot.tradeInfo', { balance: balanceStr })
      }, (() => doUntilDone(() => this.api.originalApi.send({ forget_all: 'balance' }))
      .then(() => doUntilDone(() => this.api.balance()))), false, null)
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
    this.purchase.start(this.tradeOption)
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
