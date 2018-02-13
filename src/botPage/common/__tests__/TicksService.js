import { expect } from 'chai';
import TicksService from '../TicksService';
import { logoutAllTokens, addTokenIfValid, generateLiveApiInstance } from '../../../common/appId';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

const ticksService = new TicksService(generateLiveApiInstance());

const isTick = t => Number.isInteger(t.epoch) && Number.isFinite(t.quote);

const isOhlc = o =>
    Number.isInteger(o.epoch) &&
    Number.isFinite(o.open) &&
    Number.isFinite(o.high) &&
    Number.isFinite(o.low) &&
    Number.isFinite(o.close);

const isTicksList = l => l.every(t => isTick(t));

const isCandles = l => l.every(o => isOhlc(o));

describe('Ticks Service', () => {
    describe('Monitor ticks', () => {
        const ticks = [];
        beforeAll(done => {
            let key;
            const callback = ticksList => {
                ticks.push(ticksList);
                if (ticks.length === 3) {
                    ticksService.stopMonitor('R_100', key);
                    done();
                }
            };
            key = ticksService.monitor({ symbol: 'R_100', callback });
        });
        it('Ticks stream received', () => {
            expect(ticks[0]).satisfy(isTicksList);
        });
    });
    describe('Get ticks', () => {
        let ticks;
        let candles;
        beforeAll(done => {
            ticksService
                .request({ symbol: 'R_25' })
                .then(t => {
                    ticks = t;
                    return ticksService.request({ symbol: 'R_50', granularity: 60 });
                })
                .then(c => {
                    candles = c;
                    done();
                });
        });
        it('ticks list received', () => {
            expect(ticks).satisfy(isTicksList);
        });
        it('ohlc list received', () => {
            expect(candles).satisfy(isCandles);
        });
    });
});

describe('Account', () => {
    describe('Login', () => {
        let successfulLogin;
        const expected = [
            {
                accountName       : 'VRTC1440189',
                token             : 'Xkq6oGFEHh6hJH8',
                loginInfo         : { is_virtual: true },
                hasRealityCheck   : false,
                hasTradeLimitation: false,
            },
        ];
        before(function beforeAll(done) {
            this.timeout('4000');
            addTokenIfValid('Xkq6oGFEHh6hJH8').then(() => {
                successfulLogin = true;
                done();
            });
        });
        it('Login should be successful', () => {
            expect(successfulLogin).to.be.equal(true);
            expect(JSON.parse(localStorage.tokenList).token).to.be.equal(expected.token);
        });
    });
    describe('Login on invalid token', () => {
        let successfulLogin;
        let message;
        before(function beforeAll(done) {
            this.timeout('4000');
            addTokenIfValid('someinvalidtoken123xyz')
                .then(() => {
                    successfulLogin = true;
                    done();
                })
                .catch(e => {
                    message = e;
                    successfulLogin = false;
                    done();
                });
        });
        it('Login should be unsuccessful', () => {
            expect(successfulLogin).to.be.equal(false);
            expect(message)
                .to.have.deep.property('.error.error.code')
                .that.be.equal('InvalidToken');
        });
    });
    describe('logout', () => {
        let successfulLogout;
        before(function beforeAll(done) {
            this.timeout('4000');
            logoutAllTokens().then(() => {
                successfulLogout = true;
                done();
            });
        });
        it('Logout should be successful', () => {
            expect(successfulLogout).to.be.equal(true);
            expect(localStorage.tokenList).not.to.be.ok;
        });
    });
});
