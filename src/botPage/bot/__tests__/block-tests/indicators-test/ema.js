import { expect } from 'chai'
import ema, {
  exponentialMovingAverageArray as emaa,
} from 'binary-indicators/lib/exponentialMovingAverage'
import { createJsi, header, trade, footer } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Exponential Moving Average', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        watch('before');
        result.ticks = Bot.getTicks() 
        result.emaR = Bot.ema(Bot.getTicks(), 12)
        result.emaaR = Bot.emaa(Bot.getTicks(), 12)
      ${footer}
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })

  it('ema', () => {
    const { result: { emaR, ticks } } = value

    expect(emaR).deep.equal(ema(ticks, { periods: 12 }))
  })

  it('emaa', () => {
    const { result: { emaaR, ticks } } = value

    expect(emaaR).deep.equal(emaa(ticks, { periods: 12 }))
  })
})
