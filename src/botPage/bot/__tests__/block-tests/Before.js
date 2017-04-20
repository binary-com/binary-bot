import { runAndGetResult, expectResultTypes } from '../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000 * 2

describe('Before Purchase Blocks', () => {
  let result

  beforeAll(done => {
    runAndGetResult(undefined, `
      while (watch('before')) {
        result.payout = Bot.getPayout('CALL');
        result.askPrice = Bot.getAskPrice('CALL');
        Bot.purchase('CALL');
      }
    `)
    .then(v => {
      result = v
      done()
    })
  })

  it('before purchase api', () => {
    expectResultTypes(result, [
      'number', // payout
      'number', // ask price
    ])
  })
})
