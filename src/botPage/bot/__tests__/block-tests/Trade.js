import { expect } from 'chai'
import { createJsi, header, footer } from './shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Trade Definition Blocks', () => {
  let value

  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
        Bot.start('Xkq6oGFEHh6hJH8', {
          amount: 'Hello', basis: 'stake', candleInterval: 60,
          contractTypes: '["CALL","PUT"]',
          currency: 'USD', duration: 2,
          duration_unit: 'h', symbol: 'R_100',
        }, false);
      ${footer}
    `).then(v => {
      value = v
      done()
    })
  })

  it('before purchase api', () => {
    const expectedResultTypes = [
      'boolean', // is result win
      'string', // statement
    ]

    const { result } = value
    const resultTypes = Object.keys(result).map(k => typeof result[k])

    expect(resultTypes).deep.equal(expectedResultTypes)
  })
})

