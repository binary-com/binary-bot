import { expect } from 'chai'
import { createInterpreter } from '../cli'

export const parts = {
  header: `
      (function (){
        var result = {};
  `,
  trade: `
        Bot.start('Xkq6oGFEHh6hJH8', {
          amount: 1, basis: 'stake', candleInterval: 60,
          contractTypes: ['CALL', 'PUT'],
          currency: 'USD', duration: 2,
          duration_unit: 'h', symbol: 'R_100',
        });
  `,
  waitToPurchase: `
        watch('before');
        Bot.purchase('CALL');
  `,
  waitToSell: `
        watch('during');
        Bot.sellAtMarket();
  `,
  footer: `
        return {
          result: result,
        };
      })();
  `,
}

export const run = code => createInterpreter().run(code)

export const runAndGetResult = (initCode = '', code) => new Promise(r => {
  run(`
    ${parts.header}
    ${initCode}
    ${parts.trade}
    ${code}
    ${parts.footer}
  `).then(v => r(v.result))
})

export const expectReturnTrue = (msg, code) =>
  describe(msg, () => {
    let value

    beforeAll(done => {
      run(code).then(v => {
        value = v
        done()
      })
    })
    it('return code is true', () => {
      expect(value).to.be.equal(true)
    })
  })

export const expectResultTypes = (result, types) => {
  const resultTypes = Object.keys(result).map(k => typeof result[k])

  expect(resultTypes).deep.equal(types)
}
