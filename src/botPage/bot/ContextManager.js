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
  }
  get(name) {
    return this.contexts.get(name)
  }
  set(name, value) {
    this.contexts = this.contexts.set(name, value)
  }
  setInside(name, key, value) {
    this.set(name, this.get(name).set(key, value))
  }
  setInsideAll(key, value) {
    this.contexts.forEach((a, k) => this.setInside(k, key, value))
  }
  getContext(name) {
    let context = getContextObj(this.get(name))

    if (name === 'after') {
      context = Object.assign({
        contractDetails: createDetails(context.finishedContract),
      }, context)
    }

    return context
  }
  setContext(name, value) {
    if (name === 'shared') {
      const { ohlc = [] } = value

      const newTicksObj = new Map(value).set('ohlc', addToString(ohlc))

      this.setInsideAll('ticksObj', newTicksObj)
    } else if (name === 'before') {
      this.setInside('before', 'proposals', new Map(value))
    } else if (name === 'during') {
      this.setInside('during', 'openContract', new Map(value))
    } else if (name === 'after') {
      this.setInside('after', 'finishedContract', new Map(value))
    }
  }
  execContext(name, value) {
    this.setContext(name, value)
    if (name !== 'shared') {
      this.observer.emit('CONTEXT',
        { scope: name, data: this.getContext(name) })
    }
  }
}
