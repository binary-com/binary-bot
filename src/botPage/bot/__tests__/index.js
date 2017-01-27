import { expect } from 'chai'
import JSI from '../jsi'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000

describe('Run JSI over bot', () => {
  let value

  beforeAll(done => {
    const jsi = new JSI(`
      (function (){
        Bot.start('${process.env.TESTINGTOKEN}',
        {
          amount: 1, basis: 'stake', candleInterval: 60,
          contractTypes: '["DIGITEVEN", "DIGITODD"]',
          currency: 'USD', duration: 5,
          duration_unit: 't', symbol: 'R_100',
        }
        );
        var context = wait('CONTEXT');
        Bot.purchase(1)
        context = waitUntil('during')
        return isInside('after')
      })();
    `, v => {
      value = v
      done()
    })
    jsi.start()
  })
  it('return code is correct', () => {
    expect(value.data).to.be.equal(true)
  })
})
