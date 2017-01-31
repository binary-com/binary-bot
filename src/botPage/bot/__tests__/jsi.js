import { expect } from 'chai'
import JSI from '../jsi'

describe('Run JSI over simple calculation', () => {
  let value

  beforeAll(done => {
    const jsi = new JSI()
    jsi.run('1 + 2').then(v => {
      value = v
      done()
    })
  })

  it('return code is correct', () => {
    expect(value.data).to.be.equal(3)
  })
})
