import { expect } from 'chai'
import JSI from '../jsi'

describe('Run JSI over simple calculation', () => {
  let value

  beforeAll(done => {
    const jsi = new JSI('1 + 2', v => {
      value = v
      done()
    })
    jsi.start()
  })
  it('return code is correct', () => {
    expect(value.data).to.be.equal(3)
  })
})
