import { expect } from 'chai';
import { run } from '../../tools';

describe('Index handling', () => {
    let error;

    describe('Index must be handled properly', () => {
        beforeAll(done =>
            run(
                `
        Bot.getOhlcFromEnd({ field: 'close', index: 0 })
      `
            ).catch(e => {
                error = e;
                done();
            })
        );

        it('Index (starting from 1) should be handled', () => {
            expect(error).satisfy(e => e.message);
        });
    });
});
