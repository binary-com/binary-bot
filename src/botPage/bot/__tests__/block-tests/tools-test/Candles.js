import { expect } from 'chai';
import { runAndGetResult } from '../../tools';

describe('Candle Blocks in tools', () => {
    let result;

    beforeAll(done => {
        runAndGetResult(
            undefined,
            `
      var ohlc = Bot.getOhlc();
      result.ohlc = Bot.candleValues(ohlc, 'open')
      result.isCandleBlack = Bot.isCandleBlack({ open: 1, high: 2.2, low: 0.5, close: 2, epoch: 123 });
      result.candleField = Bot.candleField({ open: 1, high: 2.2, low: 0.5, close: 2, epoch: 123 }, 'open');
    `
        ).then(v => {
            result = v;
            done();
        });
    });

    it('ohlc values', () => {
        const { isCandleBlack } = result;

        expect(isCandleBlack).equal(false);
    });

    it('is candle black', () => {
        const { ohlc } = result;

        expect(ohlc).satisfy(o => o && o.length && Number.isFinite(o[0]));
    });

    it('candle field', () => {
        const { candleField } = result;

        expect(candleField).equal(1);
    });
});
