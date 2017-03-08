import { runAndGetResult, expectedResultTypes, parts } from '../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('During Purchase Blocks', () => {
  let result

  beforeAll(done => {
    runAndGetResult(undefined, `
      ${parts.waitToPurchase}
      while (watch('during')) {
        result.sellAvailable = Bot.isSellAvailable();
        result.sellPrice = Bot.getSellPrice();
        Bot.sellAtMarket();
      }
    `).then(v => {
      result = v
      done()
    })
  })

  it('before purchase api', () => {
    expectedResultTypes(result, [
      'boolean', // is sell available
      'number', // sell price
    ])
  })
})
