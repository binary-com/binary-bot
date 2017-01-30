import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import WebSocket from 'ws'
import JSI from '../jsi'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 66000

describe('Run JSI over bot', () => {
  let value

  const api = (new CustomApi(null, null, new WebSocket(
    process.env.ENDPOINT ||
      'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))

  beforeAll(done => {
    const jsi = new JSI(api)

    jsi.run(`
      (function (){
        var count = 5;
        var again = false;
        while(true) {
          Bot.start('${process.env.TESTINGTOKEN}', {
            amount: 1, basis: 'stake', candleInterval: 60,
            contractTypes: '["DIGITEVEN", "DIGITODD"]',
            currency: 'USD', duration: 5,
            duration_unit: 't', symbol: 'R_100',
          }, again);
          again = true;
          var context = wait('CONTEXT');
          Bot.purchase("DIGITEVEN")
          context = waitUntil('during')
          if (--count === 0) {
            break;
          }
        }
        return count === 0;
      })();
    `).then(v => {
      value = v
      done()
    })
  })
  it('return code is correct', () => {
    expect(value.data).to.be.equal(true)
  })
})
