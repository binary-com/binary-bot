import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import JSI from '../JSI'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000 * 2

describe('Run JSI over bot', () => {
  let value

  beforeAll(done => {
    let observer = new Observer()
    let api = (new CustomApi(observer, null, null, new WebSocket(
      process.env.ENDPOINT ||
        'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0'))
    )
    let $scope = { observer, api }

    let jsi = new JSI($scope)
    jsi.run(`
      (function (){
        Bot.start('Xkq6oGFEHh6hJH8',
        {
          amount: 1, basis: 'stake', candleInterval: 60,
          contractTypes: '["CALL","PUT"]',
          currency: 'USD', duration: 2,
          duration_unit: 'h', symbol: 'R_100',
        }
        );
        var context
        while (testScope(context = watch('before'), 'before')) {
          Bot.purchase('CALL')
        }
      })();
    `).then(() => {
      api.originalApi.disconnect()
    })

    setTimeout(() => {
      jsi.stop()
      observer = new Observer()
      api = (new CustomApi(observer, null, null, new WebSocket(
        process.env.ENDPOINT ||
          'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0'))
      )
      $scope = { observer, api }
      jsi = new JSI($scope)
      jsi.run(`
        (function (){
          Bot.start('Xkq6oGFEHh6hJH8',
          {
            amount: 1, basis: 'stake', candleInterval: 60,
            contractTypes: '["CALL","PUT"]',
            currency: 'USD', duration: 2,
            duration_unit: 'h', symbol: 'R_100',
          }
          );
          var context
          while (testScope(context = watch('before'), 'before')) {
            Bot.purchase('CALL')
          }
          context = watch('during')
          return isInside('during')
        })();
      `).then(v => {
        value = v
        done()
      })
    }, 20000)
  })
  it('return code is correct', () => {
    expect(value).to.be.equal(true)
  })
})
