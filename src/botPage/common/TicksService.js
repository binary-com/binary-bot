import { Map } from 'immutable'
import { historyToTicks, getLast } from 'binary-utils'
import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import { doUntilDone } from '../bot/tools'

const parseTick = tick => ({
  epoch: +tick.epoch,
  quote: +tick.quote,
})

const parseOhlc = ohlc => ({
  open: +ohlc.open,
  high: +ohlc.high,
  low: +ohlc.low,
  close: +ohlc.close,
  epoch: +(ohlc.open_time || ohlc.epoch),
})

const parseCandles = candles => candles.map(t => parseOhlc(t))

const updateTicks = (ticks, newTick) => [...ticks.slice(1), newTick]

const updateCandles = (candles, ohlc) => {
  const prevCandles = getLast(candles).epoch === ohlc.epoch ?
    candles.slice(0, -1) :
    candles.slice(1)
  return [...prevCandles, ohlc]
}

const getType = isCandle => (isCandle ? 'candles' : 'ticks')

const getUUID = () => `${new Date().getTime() * Math.random()}`

export default class TicksService {
  constructor(api) {
    this.api = api
    this.ticks = new Map()
    this.candles = new Map()
    this.tickListeners = new Map()
    this.ohlcListeners = new Map()
    this.subscriptions = new Map()
    this.observe()
  }
  request(options) {
    const { symbol, granularity } = options

    const style = getType(granularity)

    if (style === 'ticks' && this.ticks.has(symbol)) {
      return Promise.resolve(this.ticks.get(symbol))
    }

    if (style === 'candles' && this.candles.hasIn(['symbol', 'granularity'])) {
      return Promise.resolve(this.candles.getIn(['symbol', 'granularity']))
    }

    return this.requestStream({ ...options, style })
  }
  monitor(options) {
    const { symbol, granularity, callback } = options

    const type = getType(granularity)

    const key = getUUID()

    this.request({ ...options, subscribe: 1 }).catch(e => globalObserver.emit('Error', e))

    if (type === 'ticks') {
      this.tickListeners = this.tickListeners.setIn([symbol, key], callback)
    } else {
      this.ohlcListeners = this.ohlcListeners.setIn([symbol, granularity, key], callback)
    }

    return key
  }
  stopMonitor(options) {
    const { symbol, granularity, key } = options
    const type = getType(granularity)

    if (type === 'ticks' && this.tickListeners.hasIn([symbol, key])) {
      this.tickListeners = this.tickListeners.deleteIn([symbol, key])
    }

    if (type === 'candles' &&
      this.ohlcListeners.hasIn([symbol, granularity, key])) {
      this.ohlcListeners = this.ohlcListeners.deleteIn([symbol, granularity, key])
    }

    this.unsubscribeIfEmptyListeners(options)
  }
  unsubscribeIfEmptyListeners(options) {
    const { symbol, granularity } = options

    let needToUnsubscribe = false

    const tickListener = this.tickListeners.get(symbol)

    if (tickListener && !tickListener.size) {
      this.tickListeners = this.tickListeners.delete(symbol)
      this.ticks = this.ticks.delete(symbol)
      needToUnsubscribe = true
    }

    const ohlcListener = this.ohlcListeners.getIn([symbol, granularity])

    if (ohlcListener && !ohlcListener.size) {
      this.ohlcListeners = this.ohlcListeners.deleteIn([symbol, granularity])
      this.candles = this.candles.deleteIn([symbol, granularity])
      needToUnsubscribe = true
    }

    if (needToUnsubscribe) {
      this.unsubscribeAllAndSubscribeListeners(symbol)
    }
  }
  unsubscribeAllAndSubscribeListeners(symbol) {
    const ohlcSubscriptions = this.subscriptions.getIn(['ohlc', symbol])
    const tickSubscription = this.subscriptions.getIn(['tick', symbol])

    const subscription = (ohlcSubscriptions ? Array.from(ohlcSubscriptions.keys()) : [])
      .concat(tickSubscription)

    Promise.all(subscription.map(id => doUntilDone(() => this.api.unsubscribeByID(id))))
      .then(() => {
        const ohlcListeners = this.ohlcListeners.get(symbol)

        if (ohlcListeners) {
          ohlcListeners.forEach((listener, granularity) => {
            this.candles = this.candles.deleteIn([symbol, granularity])
            this.requestStream({ symbol, subscribe: 1, granularity, style: 'candles' })
              .catch(e => globalObserver.emit('Error', e))
          })
        }

        if (this.tickListeners.has(symbol)) {
          this.ticks = this.ticks.delete(symbol)
          this.requestStream({ symbol, subscribe: 1, style: 'ticks' })
            .catch(e => globalObserver.emit('Error', e))
        }
      })

    this.subscriptions = new Map()
  }
  observe() {
    this.api.events.on('tick', r => {
      const { tick, tick: { symbol, id } } = r

      if (this.ticks.has(symbol)) {
        this.subscriptions = this.subscriptions.setIn(['tick', symbol], id)

        this.ticks = this.ticks.set(symbol,
            updateTicks(this.ticks.get(symbol), parseTick(tick)))

        const listeners = this.tickListeners.get(symbol)

        if (listeners) {
          listeners.forEach(callback => callback(this.ticks.get(symbol)))
        }
      }
    })

    this.api.events.on('ohlc', r => {
      const { ohlc, ohlc: { symbol, granularity, id } } = r

      if (this.candles.hasIn([symbol, granularity])) {
        this.subscriptions =
          this.subscriptions.setIn(['ohlc', symbol, granularity], id)

        this.candles = this.candles.setIn([symbol, granularity],
            updateCandles(this.candles.getIn([symbol, granularity]),
              parseOhlc(ohlc)))

        const listeners = this.ohlcListeners.getIn([symbol, granularity])

        if (listeners) {
          listeners.forEach(callback =>
              callback(this.candles.getIn([symbol, granularity])))
        }
      }
    })
  }
  requestStream(options) {
    const { symbol, subscribe, granularity, style } = options
    return new Promise((resolve, reject) => {
      doUntilDone(() => this.api.getTickHistory(symbol,
        { subscribe, end: 'latest', count: 1000, granularity, style }))
          .then(r => {
            if (style === 'ticks') {
              const ticks = historyToTicks(r.history)

              if (subscribe) {
                this.ticks = this.ticks.set(symbol, ticks)
              }

              resolve(ticks)
            } else {
              const candles = parseCandles(r.candles)

              if (subscribe) {
                this.candles = this.candles.setIn([symbol, granularity], candles)
              }

              resolve(candles)
            }
          })
        .catch(reject)
    })
  }
  getHistory(options) {
    return this.request(options)
  }
  getLast(options) {
    return new Promise((resolve, reject) => {
      this.request(options).then(t => resolve(getLast(t)), reject)
    })
  }
}
