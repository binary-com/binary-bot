import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import JSI from '../JSI'

process.on('unhandledRejection', e => console.log(e)) // eslint-disable-line

jasmine.DEFAULT_TIMEOUT_INTERVAL = 24000 * 2

const observer = new Observer()
const api = (new CustomApi(observer, null, null, new WebSocket(
  process.env.ENDPOINT ||
    'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))
const $scope = { observer, api }

const jsi = new JSI($scope)

describe('Multiple trades', () => {
  let value

  beforeAll(done => {
    jsi.run(`
      (function (){
        var count = 5;
        while(true) {
          Bot.start('Xkq6oGFEHh6hJH8', {
            amount: 1, basis: 'stake', candleInterval: 60,
            contractTypes: ['CALL', 'PUT'],
            currency: 'USD', duration: 2,
            duration_unit: 'h', symbol: 'R_100',
          });
          console.log('waiting for purchase')
          while (watch('before')) {
          console.log('before')
            Bot.purchase('CALL');
          }
          while (watch('during')) {
          console.log('during')
            Bot.sellAtMarket();
          }
          console.log('after')
          if (--count === 0) {
        console.log('Exited the loop')
            break;
          }
        }
        console.log('outside the loop')
        return count === 0;
      })();
    `).then(v => {
      value = v
      console.log('Done is called')
      done()
    }, e => {
      console.log('Thrown', e)
      throw e
    })
  })
  it('return code is correct', () => {
    expect(value).to.be.equal(true)
  })
})
