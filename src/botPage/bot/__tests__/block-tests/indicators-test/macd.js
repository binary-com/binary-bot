import { expect } from 'chai'
import macda from 'binary-indicators/lib/macd'
import { createJsi, header, trade, footer } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('MACD', () => {
  let value
  const interpreter = createJsi()

  beforeAll(done => {
    interpreter.run(`
      ${header}
      ${trade}
        watch('before');
        result.ticks = Bot.getTicks() 
        result.macdaR = Bot.macda(Bot.getTicks(), {
          fastEmaPeriod: 12,
          slowEmaPeriod: 26,
          smaPeriod: 9,
        }, 0)
      ${footer}
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })

  it('macda', () => {
    const { result: { macdaR, ticks } } = value

    expect(macdaR).deep.equal(macda(ticks, {
      fastEmaPeriod: 12,
      slowEmaPeriod: 26,
      smaPeriod: 9,
    }).map(e => e[0]))
  })
})
