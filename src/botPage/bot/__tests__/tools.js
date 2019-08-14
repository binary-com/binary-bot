import { expect } from 'chai';
import { createInterpreter } from '../CliTools';

export const init = options => `
  Bot.init('Xkq6oGFEHh6hJH8', {
    candleInterval: 60,
    contractTypes: ['CALL'],
    shouldRestartOnError: true,
    timeMachineEnabled: false,
    symbol: 'R_100', ${options || ''}
  })
`;

export const start = options =>
    `
        Bot.start({
          amount: 1,
          currency: 'USD', ${options || ''},
          basis: 'stake',
        });
`;

export const parts = {
    header: `
      (function (){
        var result = {};
  `,
    init          : init(),
    timeTrade     : `${init()}; ${start('duration: 2, duration_unit: "h"')};`,
    tickTrade     : `${init()}; ${start('duration: 5, duration_unit: "t"')};`,
    waitToPurchase: `
        watch('before');
        Bot.purchase('CALL');
  `,
    waitToSell: `
        while (watch('during')) {
          if (Bot.isSellAvailable()) {
            Bot.sellAtMarket();
          }
        }
  `,
    footer: `
        return {
          result: result,
        };
      })();
  `,
};

export const run = code => createInterpreter().run(code);

export const runAndGetResult = (initCode = '', code) =>
    new Promise(r => {
        run(
            `
    ${parts.header}
    ${initCode}
    ${parts.tickTrade}
    ${code}
    ${parts.footer}
  `
        ).then(v => r(v.result));
    });

export const expectReturnTrue = (msg, code) =>
    describe(msg, () => {
        let value;

        beforeAll(done => {
            run(code).then(v => {
                value = v;
                done();
            });
        });
        it('return code is true', () => {
            expect(value).to.be.equal(true);
        });
    });

export const expectResultTypes = (result, types) => {
    const resultTypes = Object.keys(result).map(k => typeof result[k]);

    expect(resultTypes).deep.equal(types);
};
