import { Map } from 'immutable'

const addToString = ohlc =>
  ohlc.map(o => Object.assign({
    toString: function repr() {
      return JSON.stringify(this)
    },
  }, o))

const getContextObj = obj =>
  (obj instanceof Map ? obj.map(v => getContextObj(v)).toObject() : obj)

const sharedData = new Map({ ticksObj: { ohlc: [], ticks: [] } })

export default class ContextManager {
  constructor($scope) {
    this.observer = $scope.observer
    this.context = new Map({
      data: sharedData,
      scope: '',
    })
    this.reqs = new Map()
    this.resps = new Map()
  }
  execContext(scope, value) {
    if (scope === 'between-before-and-during') {
      this.signalToContinueExecLoop(scope)
      return
    }

    this.setContext(scope, value)

    this.signalToContinueExecLoop(scope, true)
  }
  watch(scope) {
    return new Promise(r => {
      const stayWatching = this.resps.get(scope)

      if (stayWatching) {
        this.resps = this.resps.delete(scope)
        r(stayWatching)
      } else {
        this.reqs = this.reqs.set(scope, r)
      }
    })
  }
  signalToContinueExecLoop(scope, stayWatching = false) {
    if (this.reqs.has(scope)) {
      this.reqs.get(scope)(stayWatching)
      this.reqs = this.reqs.delete(scope)
    }

    this.exitFromWatchLoop(scope, 'before', 'between-before-and-during')
    this.exitFromWatchLoop(scope, 'during', 'after')

    if (scope === 'after') {
      this.reqs = new Map()
      this.resps = new Map()
    }

    this.observer.emit('CONTINUE')
  }
  exitFromWatchLoop(scope, watchedScope, nextScope) {
    if (scope === nextScope) {
      if (this.reqs.has(watchedScope)) {
        this.reqs.get(watchedScope)(false)
        this.reqs = this.reqs.delete(watchedScope)
      } else {
        this.resps = this.resps.set(watchedScope, false)
      }
    }
  }
  setContext(scope, value) {
    if (scope === 'shared') {
      const { ohlc = [] } = value
      const newTicksObj = new Map(value).set('ohlc', addToString(ohlc))

      this.setData('ticksObj', newTicksObj)
    } else if (scope === 'before') {
      this.setData('proposals', new Map(value))
    } else if (scope === 'during' || scope === 'after') {
      this.setData('contract', new Map(value))
    }
    if (scope !== 'shared') {
      this.context = this.context.set('scope', scope)
    }
  }
  setData(key, value) {
    this.context =
      this.context.set('data', this.context.get('data').set(key, value))
  }
  isInside(scope) {
    return this.context.get('scope') === scope
  }
  getContext() {
    return getContextObj(this.context)
  }
}
