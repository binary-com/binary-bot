import { expect } from 'chai'
import rsi, {
  relativeStrengthIndexArray as rsia,
} from 'binary-indicators/lib/relativeStrengthIndex'
import { createJsi, header, trade, footer } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Relative Strength Index', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        watch('before');
        result.ticks = Bot.getTicks() 
        result.rsiR = Bot.rsi(Bot.getTicks(), 12)
        result.rsiaR = Bot.rsia(Bot.getTicks(), 12)
      ${footer}
    `).then(v => {
      value = v
      done()
    })
  })

  it('rsi', () => {
    const { result: { rsiR, ticks } } = value

    expect(rsiR).deep.equal(rsi(ticks, { periods: 12 }))
  })

  it('rsia', () => {
    const { result: { rsiaR, ticks } } = value

    expect(rsiaR).deep.equal(rsia(ticks, { periods: 12 }))
  })
})
