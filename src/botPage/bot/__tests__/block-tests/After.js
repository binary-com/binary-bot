import { expect } from 'chai'
import { createJsi, header, trade, footer } from './shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('After Purchase Blocks', () => {
  let value

  const interpreter = createJsi()

  beforeAll(done => {
    interpreter.run(`
      ${header}
      function tradeAgain() {
        if (!again) {
          again = true
          return true;
        }
        return false;
      }
      while (true) {
        ${trade}
        watch('before')
        Bot.purchase('CALL')
        while (watch('during')) {
          Bot.sellAtMarket();
        }
        result.isWin = Bot.isResult('win');
        result.detail = Bot.readDetails(1);
        if (!tradeAgain()) {
          break;
        }
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
      'boolean', // is result win
      'string', // statement
    ]

    const { result } = value
    const resultTypes = Object.keys(result).map(k => typeof result[k])

    expect(resultTypes).deep.equal(expectedResultTypes)
  })
})

