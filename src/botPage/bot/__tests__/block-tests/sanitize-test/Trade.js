import { expect } from 'chai'
import { createJsi } from '../shared'
import { noop } from '../../../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

const interpreter = createJsi()

describe('Trade Definition Blocks', () => {
  let error

  describe('Start arguments', () => {
    beforeAll(done =>
      interpreter.run('Bot.start("");').then(noop, e => {
        error = e
        done()
      }, e => {
        throw e
      }))

    it('User must be logged in', () => {
      expect(error).satisfy(e => e.message)
    })
  })

  describe('Trade Option must be checked', () => {
    beforeAll(done =>
      interpreter.run('Bot.start("SomeToken", { amount: "hello" });').then(noop, e => {
        error = e
        done()
      }, e => {
        throw e
      }))

    it('Trade Option must be checked', () => {
      expect(error).satisfy(e => e.message)
    })
  })
})
