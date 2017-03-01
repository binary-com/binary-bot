import { expect } from 'chai'
import { createJsi, header, trade, footer } from './shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000 * 2

describe('Before Purchase Blocks', () => {
  let value

  const interpreter = createJsi()

  beforeAll(done => {
    interpreter.run(`
      ${header}
      ${trade}
        while (watch('before')) {
          result.payout = Bot.getPayout('CALL');
          result.askPrice = Bot.getAskPrice('CALL');
          console.log('Before seen')
          Bot.purchase('CALL');
        }
      ${footer}
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })

  it('before purchase api', () => {
    const expectedResultTypes = [
      'number', // payout
      'number', // ask price
    ]

    const { result } = value
    const resultTypes = Object.keys(result).map(k => typeof result[k])

    expect(resultTypes).deep.equal(expectedResultTypes)
  })
})
