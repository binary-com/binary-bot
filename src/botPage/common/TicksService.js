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
    this.observe()
  }
  request(symbol, granularity, subscribe) {
    const style = getType(granularity)

    if (style === 'ticks' && this.ticks.has(symbol)) {
      return Promise.resolve(this.ticks.get(symbol))
    }

    if (style === 'candles' && this.candles.hasIn(['symbol', 'granularity'])) {
      return Promise.resolve(this.candles.getIn(['symbol', 'granularity']))
    }

    return new Promise((resolve, reject) => {
      this.api.getTickHistory(symbol,
        { subscribe, end: 'latest', count: 1000, granularity, style })
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
  getHistory(symbol, granularity) {
    return this.request(symbol, granularity)
  }
  getLast(symbol, granularity) {
    return new Promise((resolve, reject) => {
      this.request(symbol, granularity).then(t => resolve(getLast(t)), reject)
    })
  }
  monitor(symbol, ...args) {
    const type = getType(args.length === 2)

    const callback = getLast(args)

    const granularity = (type === 'ticks' ? undefined : args[0])

    const key = getUUID()

    this.request(symbol, granularity, 1)

    if (type === 'ticks') {
      this.tickListeners = this.tickListeners.setIn([symbol, key], callback)
    } else {
      this.ohlcListeners = this.ohlcListeners.setIn([symbol, args[0], key], callback)
    }

    return key
  }
  stopMonitor(symbol, granularity, key) {
    const type = getType(granularity)

    if (type === 'ticks') {
      this.tickListeners = this.tickListeners.deleteIn([symbol, key])
    } else {
      this.ohlcListeners = this.ohlcListeners.deleteIn([symbol, granularity, key])
    }
  }
  observe() {
      this.api.events.on('tick', r => {
        const { tick, tick: { symbol } } = r

        if (this.ticks.has(symbol)) {
          this.ticks = this.ticks.set(symbol,
            updateTicks(this.ticks.get(symbol), parseTick(tick)))

          const listeners = this.tickListeners.get(symbol)

          if (listeners) {
            listeners.forEach(callback => callback(this.ticks.get(symbol)))
          }
        }
      })

      this.api.events.on('ohlc', r => {
        const { ohlc, ohlc: { symbol, granularity } } = r

        if (this.candles.hasIn([symbol, granularity])) {
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
}
