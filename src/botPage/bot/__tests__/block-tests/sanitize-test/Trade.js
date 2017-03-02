import { expect } from 'chai'
import { run } from '../../shared'
import { noop } from '../../../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Trade Definition Blocks', () => {
  let error

  describe('Start arguments', () => {
    beforeAll(done =>
      run('Bot.start("");').then(noop, e => {
        error = e
        done()
      }))

    it('User must be logged in', () => {
      expect(error).satisfy(e => e.message)
    })
  })

  describe('Trade Option must be checked', () => {
    beforeAll(done =>
      run('Bot.start("SomeToken", { amount: "hello" });').then(noop, e => {
        error = e
        done()
      }))

    it('Trade Option must be checked', () => {
      expect(error).satisfy(e => e.message)
    })
  })
})
