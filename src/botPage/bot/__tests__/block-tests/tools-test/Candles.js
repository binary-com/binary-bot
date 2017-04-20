import { expect } from 'chai'
import { runAndGetResult } from '../../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Candle Blocks in tools', () => {
  let result

  beforeAll(done => {
    runAndGetResult(undefined, `
      var ohlc = Bot.getOhlc();
      result.ohlc = Bot.candleValues(ohlc, 'open')
      result.isCandleBlack = Bot.isCandleBlack({ open: 1, close: 0 })
      result.candleField = Bot.candleField({ open: 1, close: 0 }, 'open')
    `).then(v => {
      result = v
      done()
    })
  })

  it('ohlc values', () => {
    const { isCandleBlack } = result

    expect(isCandleBlack).equal(true)
  })

  it('is candle black', () => {
    const { ohlc } = result

    expect(ohlc).satisfy(o => o && o.length && Number.isFinite(o[0]))
  })

  it('candle field', () => {
    const { candleField } = result

    expect(candleField).equal(1)
  })
})
