import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import WebSocket from 'ws'
import JSI from '../jsi'

describe('Run JSI over simple calculation', () => {
  let value

  const api = (new CustomApi(null, null, new WebSocket(
    process.env.ENDPOINT ||
      'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))

  beforeAll(done => {
    const jsi = new JSI(api)
    jsi.run('1 + 2').then(v => {
      value = v
      done()
    })
  })

  it('return code is correct', () => {
    expect(value.data).to.be.equal(3)
  })
})
