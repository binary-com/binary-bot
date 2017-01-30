import { observer } from 'binary-common-utils/lib/observer'
import Bot from './'
import { noop } from './tools'

export default class BotApi {
  constructor(api) {
    this.bot = new Bot(api)
  }
  getInterface() {
    return {
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
      wait: arg => this.wait(arg),
      waitUntil: arg => this.waitUntil(arg),
      isInside: arg => this.isInside(arg),
      alert: (...args) => alert(...args), // eslint-disable-line no-alert
    }
  }
  wait(arg) {
    return (typeof arg === 'string' ?
      new Promise(
        r => observer.register(arg, c => r(this.context = c), true),
        () => observer.unregisterAll(arg))
          : new Promise(r => setTimeout(() => r(), arg), noop))
  }
  waitUntil(scope) {
    return new Promise(r => {
      const waitFor = c => {
        if (c.scope !== scope) {
          observer.unregister('CONTEXT', waitFor)
          r(this.context = c)
        }
      }

      observer.register('CONTEXT', waitFor)
    })
  }
  isInside(scope) {
    return this.context.scope === scope
  }
}
