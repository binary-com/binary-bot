import { expect } from 'chai'
import { createJsi, header, trade, footer } from './shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('During Purchase Blocks', () => {
  let value

  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        watch('before')
        Bot.purchase('CALL')
        while (watch('during')) {
          result.sellAvailable = Bot.isSellAvailable();
          result.sellPrice = Bot.getSellPrice();
          Bot.sellAtMarket();
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
      'boolean', // is sell available
      'number', // sell price
    ]

    const { result } = value
    const resultTypes = Object.keys(result).map(k => typeof result[k])

    expect(resultTypes).deep.equal(expectedResultTypes)
  })
})
