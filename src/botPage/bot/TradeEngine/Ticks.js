import { getLast } from 'binary-utils';
import { translate } from '../../../common/i18n';
import { getDirection, getLastDigit } from '../tools';
import { expectPositiveInteger } from '../sanitize';
import * as constants from './state/constants';

let tickListenerKey;

export default Engine =>
    class Ticks extends Engine {
        watchTicks(symbol) {
            if (symbol && this.symbol !== symbol) {
                const { ticksService } = this.$scope;

                ticksService.stopMonitor({
                    symbol,
                    key: tickListenerKey,
                });

                const callback = ticks => {
                    this.checkProposalReady();
                    const lastTick = ticks.slice(-1)[0];
                    const { epoch } = lastTick;
                    this.store.dispatch({ type: constants.NEW_TICK, payload: epoch });
                };

                const key = ticksService.monitor({ symbol, callback });

                this.symbol = symbol;

                tickListenerKey = key;
            }
        }
        getTicks(toString = false) {
            return new Promise(resolve => {
                this.$scope.ticksService.request({ symbol: this.symbol }).then(ticks => {
                    const tickList = ticks.map(tick => {
                        if (toString) {
                            return tick.quote.toFixed(this.getPipSize());
                        }
                        return tick.quote;
                    });
                    resolve(tickList);
                });
            });
        }
        getLastTick(raw, toString = false) {
            return new Promise(resolve =>
                this.$scope.ticksService.request({ symbol: this.symbol }).then(ticks => {
                    let lastTick = raw ? getLast(ticks) : getLast(ticks).quote;
                    if (toString && !raw) {
                        lastTick = lastTick.toFixed(this.getPipSize());
                    }
                    resolve(lastTick);
                })
            );
        }
        getLastDigit() {
            return new Promise(resolve => this.getLastTick(false, true).then(tick => resolve(getLastDigit(tick))));
        }

        getLastDigitList() {
            return new Promise(resolve => this.getTicks().then(ticks => resolve(this.getLastDigitsFromList(ticks))));
        }

        getLastDigitsFromList(ticks) {
            const digits = ticks.map(tick => getLastDigit(tick.toFixed(this.getPipSize())));
            return digits;
        }
        checkDirection(dir) {
            return new Promise(resolve =>
                this.$scope.ticksService
                    .request({ symbol: this.symbol })
                    .then(ticks => resolve(getDirection(ticks) === dir))
            );
        }
        getOhlc(args) {
            const { granularity = this.options.candleInterval || 60, field } = args || {};

            return new Promise(resolve =>
                this.$scope.ticksService
                    .request({ symbol: this.symbol, granularity })
                    .then(ohlc => resolve(field ? ohlc.map(o => o[field]) : ohlc))
            );
        }
        getOhlcFromEnd(args) {
            const { index: i = 1 } = args || {};

            const index = expectPositiveInteger(Number(i), translate('Index must be a positive integer'));

            return new Promise(resolve => this.getOhlc(args).then(ohlc => resolve(ohlc.slice(-index)[0])));
        }
        getPipSize() {
            return this.$scope.ticksService.pipSizes[this.symbol];
        }
    };
