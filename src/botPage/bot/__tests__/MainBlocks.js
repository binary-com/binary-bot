import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import JSI from '../JSI'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000

describe('Run JSI over bot', () => {
  let value

  const observer = new Observer()
  const api = (new CustomApi(observer, null, null, new WebSocket(
    process.env.ENDPOINT ||
      'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))
  const $scope = { observer, api }

  beforeAll(done => {
    const jsi = new JSI($scope)

    jsi.run(`
      (function (){
        Bot.start('Xkq6oGFEHh6hJH8',
        {
          amount: 1, basis: 'stake', candleInterval: 60,
          contractTypes: '["DIGITEVEN", "DIGITODD"]',
          currency: 'USD', duration: 5,
          duration_unit: 't', symbol: 'R_100',
        }
        );
        var context = wait('CONTEXT');
        Bot.purchase('DIGITEVEN')
        while ((context = wait('CONTEXT')).scope === 'during');
        return isInside('after')
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
