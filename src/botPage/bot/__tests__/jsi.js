import { expect } from 'chai'
import JSI from '../JSI'

const jsi = new JSI()

describe('Run JSI over simple calculation', () => {
  let value

  beforeAll(done => {
    jsi.run('1 + 2').then(v => {
      value = v
      done()
    })
  })

  it('return code is correct', () => {
    expect(value).to.be.equal(3)
  })
})
