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

describe('Convert to date/time string', () => {
    const timestamp = '1560238593';
    let result;
    beforeAll(done => {
        run(`(function() {return Bot.toDateTime(${timestamp});})()`).then(v => {
            result = v;
            done();
        });
    });
    it('converts timestamp to date/time string', () => {
        expect(result).satisfy(dt => dt === '2019-06-11 15:36:33');
    });
});

describe('Convert to timestamp', () => {
    const dateTime = '2019-06-11 15:36:33';
    let result;
    beforeAll(done => {
        run(`(function() {return Bot.toTimestamp('${dateTime}');})()`).then(v => {
            result = v;
            done();
        });
    });
    it('converts date/time string to timestamp', () => {
        expect(result).satisfy(ts => ts === 1560238593);
    });
});
