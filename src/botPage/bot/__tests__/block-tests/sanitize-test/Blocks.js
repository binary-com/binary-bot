import { expect } from 'chai'
import { run, parts } from '../../tools'
import { noop } from '../../../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Trade Definition Blocks', () => {
  let error

  describe('Index must be handled properly', () => {
    beforeAll(done =>
      run(`
        ${parts.trade}
        watch('before');
        Bot.getOhlcFromEnd('close', 0)
      `).then(noop, e => {
        error = e
        done()
      }))

    it('Index (starting from 1) should be handled', () => {
      expect(error).satisfy(e => e.message)
    })
  })
})
