import { runAndGetResult, expectResultTypes, parts } from '../tools';

describe('After Purchase Blocks', () => {
    let result;

    beforeAll(done => {
        runAndGetResult(
            undefined,
            `
      ${parts.waitToPurchase}
      ${parts.waitToSell}
      result.isWin = Bot.isResult('win');
      result.detail = Bot.readDetails(1);
    `
        ).then(v => {
            result = v;
            done();
        });
    });

    it('After purchase api', () => {
        expectResultTypes(result, [
            'boolean', // is result win
            'number', // statement
        ]);
    });
});
