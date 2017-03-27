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
        while(watch('before')) {}
      })();
    `)

    setTimeout(() => {
      interpreter.stop()
      interpreter = createInterpreter()
      interpreter.run(`
        (function (){
          ${parts.trade}
          ${parts.waitToPurchase}
          ${parts.waitToSell}
          return true;
        })();
      `).then(v => {
        value = v
        done()
      })
    }, 8000)
  })
  it('Code block is executed correctly', () => {
    expect(value).to.be.equal(true)
  })
})
