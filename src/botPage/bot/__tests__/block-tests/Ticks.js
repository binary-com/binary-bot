import { expect } from 'chai';
import { runAndGetResult, expectResultTypes } from '../tools';

describe('Many getTicks in a row', () => {
    let result;

    beforeAll(done => {
        runAndGetResult(
            undefined,
            `
      result.ticks = []
      for (var i = 0; i < 100; i++) {
        result.ticks.push(Bot.getLastTick())
      }
    `
        ).then(v => {
            result = v;
            done();
        });
    });

    it('All getTicks should be the same', () => {
        const { ticks } = result;

        expect(ticks).satisfy(t => t.length === 100 && t.every(n => n === ticks[0]));
    });
});

describe('Ticks Analysis', () => {
    let result;

    beforeAll(done => {
        runAndGetResult(
            `
      result.ticks = []
      function ta() {
        result.ticks.push(Bot.getLastTick());
      }
    `,
            `
      watch('before');
      ta()
      Bot.purchase('CALL')
      while (watch('during')) {
        ta()
      }
      ta()
    `
        ).then(v => {
            result = v;
            done();
        });
    });

    it('tick analysis block', () => {
        const { ticks } = result;

        expect(ticks).satisfy(t => t.length >= 3 && t.every(n => Number.isFinite(n)));
    });
});

describe('Tick Blocks', () => {
    let result;

    beforeAll(done => {
        runAndGetResult(
            undefined,
            `
        result.lastTick = Bot.getLastTick();
        result.lastDigit = Bot.getLastDigit();
        result.lastOhlc = Bot.getOhlcFromEnd();
        result.isTickDirUp = Bot.checkDirection('rise')

        result.ohlc = Bot.getOhlc();
        result.ticks = Bot.getTicks();
        result.candleValues = Bot.getOhlc({ field: 'close' });
        result.lastCloseValue1 = Bot.getOhlcFromEnd({ field: 'close', index: 2 });
        result.lastCloseValue2 = Bot.getOhlcFromEnd({ field: 'close' });
  `
        ).then(v => {
            result = v;
            done();
        });
    });

    it('ticks api', () => {
        expectResultTypes(result, [
            'number', // last tick
            'number', // last digit
            'object', // last candle
            'boolean', // is tick direction up

            'object', // candles list
            'object', // ticks
            'object', // candle values list
            'number', // last close value
            'number', // previous close value
        ]);
    });
});
