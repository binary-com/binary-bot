import { expect } from 'chai'
import { createJsi, header, trade, footer } from './shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000 * 2

describe('Before Purchase Blocks', () => {
  let value

  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        while (testScope(context = watch('before'), 'before')) {
          result.payout = Bot.getPayout('CALL');
          result.askPrice = Bot.getAskPrice('CALL');
          Bot.purchase('CALL');
        }
      ${footer}
    `).then(v => {
      value = v
      done()
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
