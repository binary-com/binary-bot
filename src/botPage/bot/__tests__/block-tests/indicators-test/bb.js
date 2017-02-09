import { expect } from 'chai'
import bb, {
  bollingerBandsArray as bba,
} from 'binary-indicators/lib/bollingerBands'
import { createJsi, header, trade, footer } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Bollinger Bands', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        watch('before');
        result.ticks = Bot.getTicks() 
        result.bbR = Bot.bb(Bot.getTicks(), {
          periods: 12,
          stdDevUp: 5,
          stdDevDown: 5,
        }, 1)
        result.bbaR = Bot.bba(Bot.getTicks(), {
          periods: 12,
          stdDevUp: 5,
          stdDevDown: 5,
        }, 2)
      ${footer}
    `).then(v => {
      value = v
      done()
    })
  })

  it('bb', () => {
    const { result: { bbR, ticks } } = value

    expect(bbR).deep.equal(bb(ticks, {
      periods: 12,
      stdDevUp: 5,
      stdDevDown: 5,
    })[1])
  })

  it('bba', () => {
    const { result: { bbaR, ticks } } = value

    expect(bbaR).deep.equal(bba(ticks, {
      periods: 12,
      stdDevUp: 5,
      stdDevDown: 5,
    }).map(e => e[2]))
  })
})
