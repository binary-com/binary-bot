import { expect } from 'chai'
import { createInterpreter } from '../shared'
import { parts } from './shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000 * 2

describe('Run Interpreter over bot', () => {
  let value

  beforeAll(done => {
    let interpreter = createInterpreter()
    interpreter.run(`
      (function (){
        ${parts.trade}
        ${parts.waitToPurchase}
      })();
    `).then(e => {
      throw e
    })

    setTimeout(() => {
      interpreter.stop()
      interpreter = createInterpreter()
      interpreter.run(`
        (function (){
          ${parts.trade}
          ${parts.waitToPurchase}
          watch('during')
          return isInside('during')
        })();
      `).then(v => {
        value = v
        done()
      }, e => {
        throw e
      })
    }, 20000)
  })
  it('return code is correct', () => {
    expect(value).to.be.equal(true)
  })
})
