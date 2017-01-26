import { expect } from 'chai'
import JSI from '../jsi'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000

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

describe('Run JSI over bot', () => {
  let value

  beforeAll(done => {
    const jsi = new JSI(`
      (function (){
        Bot.start('nmjKBPWxM00E8Fh', { amount: 1,
          basis: 'stake', candleInterval: 60,
          contractTypes: '["DIGITEVEN", "DIGITODD"]',
          currency: 'USD', duration: 5,
          duration_unit: 't', symbol: 'R_100',
        });
        var context;
        Bot.purchase(Object.keys(
          (context = wait('CONTEXT')
        ).data.proposals)[1]);
        while((context = wait('CONTEXT')).scope === 'during');
        return context.scope === 'after';
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
