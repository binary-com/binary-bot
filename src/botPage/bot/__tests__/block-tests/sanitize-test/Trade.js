import { expect } from 'chai';
import { run } from '../../tools';

describe('Trade Definition Blocks', () => {
    let error;

    describe('Start arguments', () => {
        beforeAll(done =>
            run('Bot.init("");').catch(e => {
                error = e;
                done();
            })
        );

        it('User must be logged in', () => {
            expect(error).satisfy(e => e.message);
        });
    });

    describe('Trade Option must be checked', () => {
        beforeAll(done =>
            run(
                `
        Bot.init('Sametoken');
        Bot.start({ amount: "hello" })
      `
            ).catch(e => {
                error = e;
                done();
            })
        );

        it('Trade Option must be checked', () => {
            expect(error).satisfy(e => e.message);
        });
    });
});
