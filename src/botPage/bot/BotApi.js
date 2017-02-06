import { Map } from 'immutable'
import Bot from './'
import { noop } from './tools'
import { observer as viewObserver } from '../common/shared'

export default class BotApi {
  constructor($scope) {
    this.bot = new Bot($scope)
    this.observer = $scope.observer
    this.reqs = new Map()
    this.resps = new Map()
    this.context = {}
    this.observeContexts()
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
      stop: (...args) => this.bot.stop(...args),
      shouldRestartOnError: (...args) => this.bot.shouldRestartOnError(...args),
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
      notifyError: (...args) => viewObserver.emit('NotifyError', args),
      notify: (...args) => viewObserver.emit('Notify', args),
      getTime: () => parseInt((new Date().getTime()) / 1000, 10),
    }
  }
  getInterface(scope = 'Global') {
    return scope === 'Bot' ? {
      ...this.getBotInterface(),
      ...this.getTicksInterface(),
      ...this.getToolsInterface(),
    } : {
      watch: (...args) => this.watch(...args),
      sleep: (...args) => this.sleep(...args),
      isInside: (...args) => this.isInside(...args),
      alert: (...args) => alert(...args), // eslint-disable-line no-alert
      testScope: (context, expected) => context.scope === expected && context.data,
    }
  }
  sleep(arg) {
    return new Promise(r => setTimeout(() => r(), arg), noop)
  }
  deletePrevScopeReqs(r) {
    if (r.scope === 'between-before-and-during') {
      this.resps = this.resps.set('before', { scope: 'before' })
    }
  }
  handleAfter(r) {
    this.resps = this.resps.set('after', r)
    if (this.reqs.has('during')) {
      this.reqs.get('during')({ scope: 'during' })
      this.reqs = this.reqs.delete('during')
    }
  }
  respondWithContext(r) {
    if (this.reqs.has(r.scope)) {
      this.reqs.get(r.scope)(r)
      this.reqs = this.reqs.delete(r.scope)
    } else if (r.scope === 'after') {
      this.handleAfter(r)
    }
  }
  observeContexts() {
    this.observer.register('CONTEXT', r => {
      this.context = r
      this.deletePrevScopeReqs(r)
      this.respondWithContext(r)

      setTimeout(() => this.observer.emit('CONTINUE'), 0)
    })
  }
  watch(scope) {
    return new Promise(r => {
      const response = this.resps.get(scope)

      if (response) {
        this.resps = this.resps.delete(scope)
        r(response)
      } else {
        this.reqs = this.reqs.set(scope, c => r(c))
      }
    })
  }
  isInside(scope) {
    return this.context.scope === scope
  }
}
