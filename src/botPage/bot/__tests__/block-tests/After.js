import { runAndGetResult, expectResultTypes, parts } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('After Purchase Blocks', () => {
  let result

  beforeAll(done => {
    runAndGetResult(`
      function tradeAgain() {
        if (!again) {
          again = true
          return true;
        }
        return false;
      }
      while (true) {
      `, `
        ${parts.waitToPurchase}
        ${parts.waitToSell}
        result.isWin = Bot.isResult('win');
        result.detail = Bot.readDetails(1);
        if (!tradeAgain()) {
          break;
        }
      }
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

