import { runAndGetResult, expectResultTypes } from '../tools';

describe('Before Purchase Blocks', () => {
    let result;

    beforeAll(done => {
        runAndGetResult(
            undefined,
            `
      watch('before');
      result.payout = Bot.getPayout('CALL');
      result.askPrice = Bot.getAskPrice('CALL');
      Bot.purchase('CALL');
    `
        ).then(v => {
            result = v;
            done();
        });
    });

    it('before purchase api', () => {
        expectResultTypes(result, [
            'number', // payout
            'number', // ask price
        ]);
    });
});
