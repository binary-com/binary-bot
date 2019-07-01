import { expect } from 'chai';
import { run } from '../../tools';

describe('Time in tools', () => {
    let result;

    beforeAll(done => {
        run(
            `
      (function() {
        var result = {};
        result.time1 = Bot.getTime();
        sleep(2)
        result.time2 = Bot.getTime();
        return result;
      })()
    `
        ).then(v => {
            result = v;
            done();
        });
    });

    it('time is correctly skewed', () => {
        const { time1, time2 } = result;

        expect(time2 - time1).most(3);
    });
});

describe('Convert timestamp to date/time and back', () => {
    const timestamp = Math.ceil(new Date().getTime() / 1000);
    let result;
    beforeAll(done => {
        run(`(function() {return Bot.toTimestamp(Bot.toDateTime(${timestamp}));})()`).then(v => {
            result = v;
            done();
        });
    });
    it('converts timestamp to date/time string', () => {
        expect(result).satisfy(dt => dt === timestamp);
    });
});
