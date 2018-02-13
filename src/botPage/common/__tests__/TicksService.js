/* eslint-disable no-unused-expressions */
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
            expect(isTicksList(ticks[0])).toBeTruthy();
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
            expect(isTicksList(ticks)).toBeTruthy();
        });
        it('ohlc list received', () => {
            expect(isCandles(candles)).toBeTruthy();
        });
    });
});

describe('Account', () => {
    describe('Login', () => {
        it('Login should be successful', () => {
            expect(addTokenIfValid('Xkq6oGFEHh6hJH8')).resolves;
        });
    });
    describe('Login on invalid token', () => {
        it('Login should be unsuccessful', async () => {
            try {
                await addTokenIfValid('someinvalidtoken123xyz');
            } catch (e) {
                expect(e).toBeTruthy();
            }
        });
    });
    describe('logout', () => {
        it('Logout should be successful', () => {
            expect(logoutAllTokens).not.toThrow();
        });
    });
});
