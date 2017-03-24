import { runAndGetResult, expectResultTypes, parts } from '../tools'


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

  it('During purchase api', () => {
    expectResultTypes(result, [
      'boolean', // is sell available
      'number', // sell price
    ])
  })
})
