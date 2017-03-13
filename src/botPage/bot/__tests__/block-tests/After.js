import { runAndGetResult, expectResultTypes, parts } from '../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('After Purchase Blocks', () => {
  let result

  beforeAll(done => {
    runAndGetResult(undefined, `
      ${parts.waitToPurchase}
      ${parts.waitToSell}
      result.isWin = Bot.isResult('win');
      result.detail = Bot.readDetails(1);
    `).then(v => {
      result = v
      done()
    })
  })

  it('before purchase api', () => {
    expectResultTypes(result, [
      'boolean', // is result win
      'string', // statement
    ])
  })
})

