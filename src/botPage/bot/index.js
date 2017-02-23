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


/**
 * @namespace tradeOption
 * @property {number} amount - Amount for the contract
 * @property {string} currency - The currency for the contract
 * @property {string} basis - Basis for the contract ("stake")
 * @property {number} candleInterval -
 *   Interval for candles list (valid inputs in
 *   {@link https://developers.binary.com/api/#ticks_history|#ticks_history})
 * @property {string[]} contractTypes - The desired contract types
 * @property {number} duration - Contract duration
 * @property {string} duration_unit - Contract duration unit (valid inputs in
 *   {@link https://developers.binary.com/api/#proposal|#proposal})
 * @property {string} symbol - The underlying symbol (valid inputs in
 *   {@link https://developers.binary.com/api/#active_symbols|#active_symbols})
 * @property {boolean} restartOnError - Whether to restart on error or not
 * @property {number} prediction - prediction number for trades (optional)
 * @property {number} barrierOffset - barrier offset for the trade (optional)
 * @property {number} secondBarrierOffset - second barrier offset for the trade (optional)
 *
 * @example {
   amount: 1, basis: 'stake', candleInterval: 60,
   contractTypes: ['CALL', 'PUT'],
   currency: 'USD', duration: 2,
   duration_unit: 'h', symbol: 'R_100',
 }
 */

/**
 * @namespace limitations
 * @property {number} maxLoss - Maximum acceptable loss amount
 * @property {number} maxTrades - Maximum acceptable num of trades
 */
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
  /**
   * start
   * @memberof Bot
   * @param {string} token - Token to login
   * @param {object} tradeOption - {@link tradeOption}
   * @param {boolean} sameTrade - Is this a repeat of trade or is this a fresh start
   * @param {object} limitations - {@link limitations}
   */
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
