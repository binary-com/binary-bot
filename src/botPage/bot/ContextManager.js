import { getUTCTime } from 'binary-common-utils/lib/tools'
import { Map } from 'immutable'

const addToString = ohlc =>
  ohlc.map(o => Object.assign({
    toString: function repr() {
      return JSON.stringify(this)
    },
  }, o))

const createDetails = (contract) => {
  const profit = +(+(contract.sell_price) -
    (+(contract.buy_price))).toFixed(2)
  const result = (profit < 0) ? 'loss' : 'win'

  return [
    contract.transaction_ids.buy, (+contract.buy_price),
    (+contract.sell_price), profit, contract.contract_type,
    getUTCTime(new Date(parseInt(`${contract.entry_tick_time}000`, 10))),
    (+contract.entry_tick),
    getUTCTime(new Date(parseInt(`${contract.exit_tick_time}000`, 10))),
    (+contract.exit_tick),
    (+((contract.barrier) ? contract.barrier : 0)),
    result,
  ]
}

const sharedContext = new Map({ ticksObj: { ohlc: [], ticks: [] } })

const getContextObj = obj =>
  (obj instanceof Map ? obj.map(v => getContextObj(v)).toObject() : obj)

export default class ContextManager {
  constructor($scope) {
    this.observer = $scope.observer
    this.contexts = new Map({
      before: sharedContext,
      during: sharedContext,
      after: sharedContext,
      shared: sharedContext,
    })
    this.reqs = new Map()
    this.resps = new Map()
    this.lastContext = {}
  }
  execContext(scope, value) {
    if (!value) {
      this.serveContext({ scope })
      return
    }

    this.setContext(scope, value)

    if (scope !== 'shared') {
      this.serveContext({ scope, data: this.getContext(scope) })
    }
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
  serveContext(r) {
    this.lastContext = r
    this.deletePrevScopeReqs(r)
    this.respondWithContext(r)

    setTimeout(() => this.observer.emit('CONTINUE'), 0)
  }
  respondWithContext(r) {
    if (this.reqs.has(r.scope)) {
      this.reqs.get(r.scope)(r)
      this.reqs = this.reqs.delete(r.scope)
      return
    }
    if (r.scope === 'after') {
      this.handleAfter(r)
    }
  }
  handleAfter(r) {
    this.resps = this.resps.set('after', r)
    if (this.reqs.has('during')) {
      this.reqs.get('during')({ scope: 'during' })
      this.reqs = this.reqs.delete('during')
    }
  }
  deletePrevScopeReqs(r) {
    if (r.scope === 'between-before-and-during') {
      this.resps = this.resps.set('before', { scope: 'before' })
    }
  }
  setContext(scope, value) {
    if (scope === 'shared') {
      const { ohlc = [] } = value

      const newTicksObj = new Map(value).set('ohlc', addToString(ohlc))

      this.setInsideAll('ticksObj', newTicksObj)
    } else if (scope === 'before') {
      this.setInside('before', 'proposals', new Map(value))
    } else if (scope === 'during') {
      this.setInside('during', 'openContract', new Map(value))
    } else if (scope === 'after') {
      this.setInside('after', 'finishedContract', new Map(value))
    }
  }
  getContext(scope) {
    let context = getContextObj(this.get(scope))

    if (scope === 'after') {
      context = Object.assign({
        contractDetails: createDetails(context.finishedContract),
      }, context)
    }

    return context
  }
  setInsideAll(key, value) {
    this.contexts.forEach((a, k) => this.setInside(k, key, value))
  }
  setInside(scope, key, value) {
    this.set(scope, this.get(scope).set(key, value))
  }
  get(scope) {
    return this.contexts.get(scope)
  }
  set(scope, value) {
    this.contexts = this.contexts.set(scope, value)
  }
  isInside(scope) {
    return this.lastContext.scope === scope
  }
  getLastContext() {
    return this.lastContext
  }
  testScope(context, expected) {
    return !!(context.scope === expected && context.data)
  }
}
