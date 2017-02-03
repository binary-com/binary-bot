import { Stack } from 'immutable'
import Bot from './'
import { noop } from './tools'
import { notifyError } from '../../common/logger'

export default class BotApi {
  constructor($scope) {
    this.bot = new Bot($scope)
    this.observer = $scope.observer
    this.reqQ = new Stack()
    this.respQ = new Stack()
    this.order = ['before', 'during', 'after']
    this.expected = 0
    this.context = {}
    this.observer.register('CONTEXT', r => {
      if (this.reqQ.size) {
        const f = this.reqQ.first()
        this.reqQ = this.reqQ.shift()
        f(r)
      } else {
        this.respQ = this.respQ.unshift(r)
      }
      setTimeout(() => this.observer.emit('CONTINUE'), 0)
    })
  }
  getInterface(scope = 'Global') {
    return scope === 'Bot' ? {
      start: (...args) => this.bot.start(...args),
      purchase: option => this.bot.purchase.purchase(option),
      getContract: (...args) => this.bot.purchase.getContract(...args),
      getAskPrice: name => +(this.bot.purchase.getContract(name).ask_price),
      getPayout: name => +(this.bot.purchase.getContract(name).payout),
      isSellAvailable: (...args) => this.bot.purchase.isSellAvailable(...args),
      sellAtMarket: (...args) => this.bot.purchase.sellAtMarket(...args),
      getSellPrice: () =>
        +(((+this.context.data.openContract.bid_price) -
          (+this.context.data.openContract.buy_price)).toFixed(2)),
      isResult: result => (this.context.data.contractDetails[10] === result),
      readDetails: i => this.context.data.contractDetails[+i - 1],
    } : {
      wait: arg => this.wait(arg),
      isInside: arg => this.isInside(arg),
      alert: (...args) => alert(...args), // eslint-disable-line no-alert
      notifyError: (...args) => notifyError(...args),
    }
  }
  wait(arg) {
    return (typeof arg === 'number' ?
      new Promise(r => setTimeout(() => r(), arg), noop) :
      new Promise(r => {
        if (this.respQ.size) {
          const c = this.respQ.first()
          this.respQ = this.respQ.shift()
          r(this.context = c)
        } else {
          this.reqQ = this.reqQ.unshift(c => r(this.context = c))
        }
      }))
  }
  isInside(scope) {
    return this.context.scope === scope
  }
}
