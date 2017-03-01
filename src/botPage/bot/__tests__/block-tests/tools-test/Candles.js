import { expect } from 'chai'
import { createJsi, header, trade, footer } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Candle Blocks in tools', () => {
  let value
  const interpreter = createJsi()

  beforeAll(done => {
    interpreter.run(`
      ${header}
      ${trade}
        watch('before');
        var ohlc = Bot.getOhlc();
        result.ohlc = Bot.candleValues(ohlc, 'open')
        result.isCandleBlack = Bot.isCandleBlack({ open: 1, close: 0 })
        result.candleField = Bot.candleField({ open: 1, close: 0 }, 'open')
      ${footer}
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })

  it('ohlc values', () => {
    const { result: { isCandleBlack } } = value

    expect(isCandleBlack).equal(true)
  })

  it('is candle black', () => {
    const { result: { ohlc } } = value

    expect(ohlc).satisfy(o => o && o.length && typeof o[0] === 'number')
  })

  it('candle field', () => {
    const { result: { candleField } } = value

    expect(candleField).equal(1)
  })
})
