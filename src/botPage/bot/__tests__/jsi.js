import { expect } from 'chai'
import Interpreter from '../Interpreter'

const interpreter = new Interpreter()

describe('Run Interpreter over simple calculation', () => {
  let value

  beforeAll(done => {
    interpreter.run('1 + 2').then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })

  it('return code is correct', () => {
    expect(value).to.be.equal(3)
  })
})
