import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import Interpreter from '../Interpreter'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 18000 * 2

const observer = new Observer()
const api = (new CustomApi(observer, null, null, new WebSocket(
  process.env.ENDPOINT ||
    'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))
const $scope = { observer, api }

const interpreter = new Interpreter($scope)

describe('Run Interpreter over bot', () => {
  let value

  beforeAll(done => {
    interpreter.run(`
      (function (){
        Bot.start('Xkq6oGFEHh6hJH8', {
          amount: 1, basis: 'stake', candleInterval: 60,
          contractTypes: ['CALL', 'PUT'],
          currency: 'USD', duration: 2,
          duration_unit: 'h', symbol: 'frxAUDUSD',
        });
        watch('before');
        return isInside('before');
      })();
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })
  it('return code is correct', () => {
    expect(value).to.be.equal(true)
  })
})
