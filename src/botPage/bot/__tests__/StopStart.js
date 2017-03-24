import { expect } from 'chai'
import { createInterpreter } from '../cli'
import { parts } from './tools'

describe('Run Interpreter over bot', () => {
  let value

  beforeAll(done => {
    let interpreter = createInterpreter()
    interpreter.run(`
      (function (){
        ${parts.trade}
        ${parts.waitToPurchase}
      })();
    `)

    setTimeout(() => {
      interpreter.stop()
      interpreter = createInterpreter()
      interpreter.run(`
        (function (){
          ${parts.trade}
          ${parts.waitToPurchase}
          watch('during')
          return true;
        })();
      `).then(v => {
        value = v
        done()
      })
    }, 20000)
  })
  it('Code block is executed correctly', () => {
    expect(value).to.be.equal(true)
  })
})
