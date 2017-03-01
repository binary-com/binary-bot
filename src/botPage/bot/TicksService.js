import { Map } from 'immutable'
import { historyToTicks, getLast } from 'binary-utils'

const parseTick = tick => ({
  epoch: +tick.epoch,
  quote: +tick.quote,
})

const parseOhlc = ohlc => ({
  open: +ohlc.open,
  high: +ohlc.high,
  low: +ohlc.low,
  close: +ohlc.close,
  epoch: +ohlc.epoch,
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

const addToArray =
  (arr, el) => (arr instanceof Array ? [...arr, el] : [el])

export default class TicksService {
  constructor(api) {
    this.api = api
    this.ticks = new Map()
    this.candles = new Map()
    this.tickListeners = new Map()
    this.ohlcListeners = new Map()
  }
  request(symbol, granularity) {
    const style = getType(granularity)

    if (style === 'ticks' && this.ticks.has(symbol)) {
      return Promise.resolve(this.ticks.get(symbol))
    }

    if (style === 'candles' && this.candles.has(symbol) &&
      this.candles.get(symbol).has(granularity)) {
      return Promise.resolve(this.candles.get(symbol).get(granularity))
    }

    if (style === 'ticks') {
      this.api.events.on('tick', r => {
        const { tick } = r

        if (this.ticks.has(symbol)) {
          this.ticks = this.ticks.set(symbol,
            updateTicks(this.ticks.get(symbol), parseTick(tick)))

          const listeners = this.tickListeners.get(symbol)

          if (listeners) {
            listeners.forEach(cb => cb(this.ticks.get(symbol)))
          }
        }
      })
    }

    if (style === 'candles') {
      this.api.events.on('ohlc', r => {
        const { ohlc } = r

        if (this.candles.hasIn([symbol, granularity])) {
          this.candles = this.candles.setIn([symbol, granularity],
            updateCandles(this.candles.getIn([symbol, granularity]), parseOhlc(ohlc)))

          const listeners = this.ohlcListeners.getIn([symbol, granularity])

          if (listeners) {
            listeners.forEach(cb => cb(this.candles.getIn([symbol, granularity])))
          }
        }
      })
    }

    return new Promise((resolve, reject) => {
      this.api.getTickHistory(symbol,
        { subscribe: 1, end: 'latest', count: 1000, granularity, style })
          .then(r => {
            if (style === 'ticks') {
              this.ticks = this.ticks.set(symbol, historyToTicks(r.history))

              resolve(this.ticks.get(symbol))
            } else {
              this.candles = this.candles.setIn([symbol, granularity],
                parseCandles(r.candles))

              resolve(this.candles.getIn([symbol, granularity]))
            }
          })
        .catch(reject)
    })
  }
  getHistory(...args) {
    return this.request(...args)
  }
  getLast(...args) {
    return new Promise((resolve, reject) => {
      this.request(...args).then(t => resolve(getLast(t)), reject)
    })
  }
  monitor(symbol, ...args) {
    const type = getType(args.length === 2)
    const cb = getLast(args)

    this.request(symbol, ...args.slice(0, -1))

    if (type === 'ticks') {
      this.tickListeners = this.tickListeners.set(symbol,
        addToArray(this.tickListeners.get(symbol), cb))
    } else {
      const granularity = args[0]

      this.ohlcListeners.setIn([symbol, granularity],
        addToArray(this.ohlcListeners.getIn([symbol, granularity]), cb))
    }
  }
  stopMonitor(symbol, granularity) {
    const type = getType(granularity)

    if (type === 'ticks') {
      this.tickListeners = this.tickListeners.delete(symbol)
    } else {
      this.ohlcListeners = this.ohlcListeners.deleteIn([symbol, granularity])
    }
  }
}
