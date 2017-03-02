import { expect } from 'chai'
import websocket from 'ws'
import { LiveApi } from 'binary-live-api'
import TicksService from '../TicksService'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

const ticksService = new TicksService(new LiveApi({ websocket }))

const isTick = t => Number.isInteger(t.epoch) && Number.isFinite(t.quote)

const isOhlc = o => Number.isInteger(o.epoch) && Number.isFinite(o.open) &&
  Number.isFinite(o.high) && Number.isFinite(o.low) && Number.isFinite(o.close)

const isTicksList = l => l.reduce((r, t) => r && isTick(t), true)

const isCandles = l => l.reduce((r, o) => r && isOhlc(o), true)

describe('Ticks Service', () => {
  describe('Monitor market ticks', () => {
    const ticks = []
    beforeAll(done => {
      const key = ticksService.monitor('R_100', ticksList => {
        ticks.push(ticksList)
        if (ticks.length === 3) {
          ticksService.stopMonitor('R_100', key)
          done()
        }
      })
    })
    it('Requested market tick received', () => {
      expect(ticks[0]).satisfy(isTicksList)
    })
  })
  describe('Get ticks', () => {
    let tick
    let ohlc
    let ticks
    let candles
    beforeAll(done => {
      ticksService.getLast('R_10').then(t => {
        tick = t
        return ticksService.getLast('R_10', 60)
      })
      .then(o => {
        ohlc = o
        return ticksService.getHistory('R_25')
      })
      .then(t => {
        ticks = t
        return ticksService.getHistory('R_50', 60)
      })
      .then(c => {
        candles = c
        done()
      })
    })
    it('Requested market tick received', () => {
      expect(tick).satisfy(isTick)
    })
    it('Requested market ohlc received', () => {
      expect(ohlc).satisfy(isOhlc)
    })
    it('Requested market ticks received', () => {
      expect(ticks).satisfy(isTicksList)
    })
    it('Requested market ohlc received', () => {
      expect(candles).satisfy(isCandles)
    })
  })
})

