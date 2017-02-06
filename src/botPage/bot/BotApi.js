import { Stack } from 'immutable'
import Bot from './'
import { noop } from './tools'
import { notifyError, notify } from '../common/logger'

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
  getOhlc(field) {
    const ohlc = this.context.data.ticksObj.ohlc

    return field ? ohlc.map(o => o[field]) : ohlc
  }
  getTicks() {
    return this.context.data.ticksObj.ticks.map(o => o.quote)
  }
  getPipSize() {
    return this.context.data.ticksObj.pipSize
  }
  getBotInterface() {
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
    }
  }
  getTicksInterface() {
    const getLastTick = () => this.getTicks().slice(-1)[0]
    const getDirection = () => this.context.data.ticksObj.direction

    return {
      getLastTick,
      getLastDigit: () => +(getLastTick().toFixed(this.getPipSize()).slice(-1)[0]),
      getOhlcFromEnd: (field, index) => {
        const lastOhlc = this.getOhlc().slice(-(+index || 1))[0]

        return field ? lastOhlc[field] : lastOhlc
      },
      getOhlc: (field) => this.getOhlc(field),
      getTicks: () => this.getTicks(),
      checkDirection: w => getDirection() === w,
      getDirection,
    }
  }
  getToolsInterface() {
    return {
      notify: (...args) => notify(...args),
      notifyError: (...args) => notifyError(...args),
    }
  }
  getInterface(scope = 'Global') {
    return scope === 'Bot' ? {
      ...this.getBotInterface(),
      ...this.getTicksInterface(),
      ...this.getToolsInterface(),
    } : {
      wait: arg => this.wait(arg),
      isInside: arg => this.isInside(arg),
      alert: (...args) => alert(...args), // eslint-disable-line no-alert
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
