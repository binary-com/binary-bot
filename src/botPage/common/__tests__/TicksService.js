import { expect } from 'chai'
import websocket from 'ws'
import { LiveApi } from 'binary-live-api'
import TicksService from '../TicksService'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

const ticksService = new TicksService(new LiveApi({ websocket, appId: 1169 }))

const isTick = t => Number.isInteger(t.epoch) && Number.isFinite(t.quote)

const isOhlc = o => Number.isInteger(o.epoch) && Number.isFinite(o.open) &&
  Number.isFinite(o.high) && Number.isFinite(o.low) && Number.isFinite(o.close)

const isTicksList = l => l.every(t => isTick(t))

const isCandles = l => l.every(o => isOhlc(o))

describe('Ticks Service', () => {
  describe('Monitor ticks', () => {
    const ticks = []
    beforeAll(done => {
      let key
      const callback = ticksList => {
        ticks.push(ticksList)
        if (ticks.length === 3) {
          ticksService.stopMonitor('R_100', key)
          done()
        }
      }
      key = ticksService.monitor({ symbol: 'R_100', callback })
    })
    it('Ticks stream received', () => {
      expect(ticks[0]).satisfy(isTicksList)
    })
  })
  describe('Get ticks', () => {
    let ticks
    let candles
    beforeAll(done => {
      ticksService.request({ symbol: 'R_25' })
      .then(t => {
        ticks = t
        return ticksService.request({ symbol: 'R_50', granularity: 60 })
      })
      .then(c => {
        candles = c
        done()
      })
    })
    it('ticks list received', () => {
      expect(ticks).satisfy(isTicksList)
    })
    it('ohlc list received', () => {
      expect(candles).satisfy(isCandles)
    })
  })
})

