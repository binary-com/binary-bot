import { expect } from 'chai'
import { createJsi, trade } from '../shared'
import { noop } from '../../../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

const interpreter = createJsi()

describe('Trade Definition Blocks', () => {
  let error

  describe('Index must be handled properly', () => {
    beforeAll(done =>
      interpreter.run(`
        ${trade}
        watch('before');
        Bot.getOhlcFromEnd('close', 0)
      `).then(noop, e => {
        error = e
        done()
      }, e => {
        throw e
      }))

    it('Index (starting from 1) should be handled', () => {
      expect(error).satisfy(e => e.message)
    })
  })
})
