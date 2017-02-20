import { expect } from 'chai'
import sma, {
  simpleMovingAverageArray as smaa,
} from 'binary-indicators/lib/simpleMovingAverage'
import { createJsi, header, trade, footer } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Simple Moving Average', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        watch('before');
        result.ticks = Bot.getTicks() 
        result.smaR = Bot.sma(Bot.getTicks(), 12)
        result.smaaR = Bot.smaa(Bot.getTicks(), 12)
      ${footer}
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })

  it('sma', () => {
    const { result: { smaR, ticks } } = value

    expect(smaR).deep.equal(sma(ticks, { periods: 12 }))
  })

  it('smaa', () => {
    const { result: { smaaR, ticks } } = value

    expect(smaaR).deep.equal(smaa(ticks, { periods: 12 }))
  })
})
