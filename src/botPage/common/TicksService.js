import { Map } from 'immutable';
import { historyToTicks, getLast } from 'binary-utils';
import { observer as globalObserver } from '../../common/utils/observer';
import { doUntilDone, getUUID } from '../bot/tools';

const parseTick = tick => ({
    epoch: +tick.epoch,
    quote: +tick.quote,
});

const parseOhlc = ohlc => ({
    open : +ohlc.open,
    high : +ohlc.high,
    low  : +ohlc.low,
    close: +ohlc.close,
    epoch: +(ohlc.open_time || ohlc.epoch),
});

const parseCandles = candles => candles.map(t => parseOhlc(t));

const updateTicks = (ticks, newTick) => (getLast(ticks).epoch >= newTick.epoch ? ticks : [...ticks.slice(1), newTick]);

const updateCandles = (candles, ohlc) => {
    const lastCandle = getLast(candles);
    if (
        (lastCandle.open === ohlc.open &&
            lastCandle.high === ohlc.high &&
            lastCandle.low === ohlc.low &&
            lastCandle.close === ohlc.close &&
            lastCandle.epoch === ohlc.epoch) ||
        lastCandle.epoch > ohlc.epoch
    ) {
        return candles;
    }
    const prevCandles = lastCandle.epoch === ohlc.epoch ? candles.slice(0, -1) : candles.slice(1);
    return [...prevCandles, ohlc];
};

const getType = isCandle => (isCandle ? 'candles' : 'ticks');

export default class TicksService {
    constructor(api) {
        this.api = api;
        this.ticks = new Map();
        this.candles = new Map();
        this.tickListeners = new Map();
        this.ohlcListeners = new Map();
        this.subscriptions = new Map();
        this.ticks_history_promise = null;
        this.candles_promise = null;
        this.active_symbols_promise = null;
        this.observe();
    }
    requestPipSizes() {
        if (this.pipSizes) {
            return Promise.resolve(this.pipSizes);
        }

        if (!this.active_symbols_promise) {
            this.active_symbols_promise = new Promise(resolve => {
                this.api.getActiveSymbolsBrief().then(r => {
                    const { active_symbols: symbols } = r;
                    this.pipSizes = symbols.reduce((accumulator, currSymbol) => {
                        // eslint-disable-next-line no-param-reassign
                        accumulator[currSymbol.symbol] = `${currSymbol.pip}`.length - 2;
                        return accumulator;
                    }, {});
                    resolve(this.pipSizes);
                });
            });
        }
        return this.active_symbols_promise;
    }
    request(options) {
        const { symbol, granularity } = options;

        const style = getType(granularity);

        if (style === 'ticks' && this.ticks.has(symbol)) {
            return Promise.resolve(this.ticks.get(symbol));
        }

        if (style === 'candles' && this.candles.hasIn([symbol, Number(granularity)])) {
            return Promise.resolve(this.candles.getIn([symbol, Number(granularity)]));
        }

        return this.requestStream({ ...options, style });
    }
    monitor(options) {
        const { symbol, granularity, callback } = options;

        const type = getType(granularity);

        const key = getUUID();

        this.request(options).catch(e => globalObserver.emit('Error', e));

        if (type === 'ticks') {
            this.tickListeners = this.tickListeners.setIn([symbol, key], callback);
        } else {
            this.ohlcListeners = this.ohlcListeners.setIn([symbol, Number(granularity), key], callback);
        }

        return key;
    }
    stopMonitor(options) {
        const { symbol, granularity, key } = options;
        const type = getType(granularity);

        if (type === 'ticks' && this.tickListeners.hasIn([symbol, key])) {
            this.tickListeners = this.tickListeners.deleteIn([symbol, key]);
        }

        if (type === 'candles' && this.ohlcListeners.hasIn([symbol, Number(granularity), key])) {
            this.ohlcListeners = this.ohlcListeners.deleteIn([symbol, Number(granularity), key]);
        }

        this.unsubscribeIfEmptyListeners(options);
    }
    unsubscribeIfEmptyListeners(options) {
        const { symbol, granularity } = options;

        let needToUnsubscribe = false;

        const tickListener = this.tickListeners.get(symbol);

        if (tickListener && !tickListener.size) {
            this.tickListeners = this.tickListeners.delete(symbol);
            this.ticks = this.ticks.delete(symbol);
            needToUnsubscribe = true;
        }

        const ohlcListener = this.ohlcListeners.getIn([symbol, Number(granularity)]);

        if (ohlcListener && !ohlcListener.size) {
            this.ohlcListeners = this.ohlcListeners.deleteIn([symbol, Number(granularity)]);
            this.candles = this.candles.deleteIn([symbol, Number(granularity)]);
            needToUnsubscribe = true;
        }

        if (needToUnsubscribe) {
            this.unsubscribeAllAndSubscribeListeners(symbol);
        }
    }
    unsubscribeAllAndSubscribeListeners(symbol) {
        const ohlcSubscriptions = this.subscriptions.getIn(['ohlc', symbol]);
        const tickSubscription = this.subscriptions.getIn(['tick', symbol]);

        const subscription = [
            ...(ohlcSubscriptions ? Array.from(ohlcSubscriptions.values()) : []),
            ...(tickSubscription || []),
        ];

        Promise.all(subscription.map(id => doUntilDone(() => this.api.unsubscribeByID(id))));

        this.subscriptions = new Map();
    }
    updateTicksAndCallListeners(symbol, ticks) {
        if (this.ticks.get(symbol) === ticks) {
            return;
        }
        this.ticks = this.ticks.set(symbol, ticks);

        const listeners = this.tickListeners.get(symbol);

        if (listeners) {
            listeners.forEach(callback => callback(this.ticks.get(symbol)));
        }
    }
    updateCandlesAndCallListeners(address, candles) {
        if (this.ticks.getIn(address) === candles) {
            return;
        }
        this.candles = this.candles.setIn(address, candles);

        const listeners = this.ohlcListeners.getIn(address);

        if (listeners) {
            listeners.forEach(callback => callback(this.candles.getIn(address)));
        }
    }
    observe() {
        this.api.events.on('tick', r => {
            const {
                tick,
                tick: { symbol, id },
            } = r;

            if (this.ticks.has(symbol)) {
                this.subscriptions = this.subscriptions.setIn(['tick', symbol], id);
                this.updateTicksAndCallListeners(symbol, updateTicks(this.ticks.get(symbol), parseTick(tick)));
            }
        });

        this.api.events.on('ohlc', r => {
            const {
                ohlc,
                ohlc: { symbol, granularity, id },
            } = r;

            if (this.candles.hasIn([symbol, Number(granularity)])) {
                this.subscriptions = this.subscriptions.setIn(['ohlc', symbol, Number(granularity)], id);
                const address = [symbol, Number(granularity)];
                this.updateCandlesAndCallListeners(
                    address,
                    updateCandles(this.candles.getIn(address), parseOhlc(ohlc))
                );
            }
        });
    }
    requestStream(options) {
        const { style } = options;
        const stringifiedOptions = JSON.stringify(options);

        if (style === 'ticks') {
            if (!this.ticks_history_promise || this.ticks_history_promise.stringifiedOptions !== stringifiedOptions) {
                this.ticks_history_promise = {
                    promise: this.requestPipSizes().then(() => this.requestTicks(options)),
                    stringifiedOptions,
                };
            }

            return this.ticks_history_promise.promise;
        }

        if (style === 'candles') {
            if (!this.candles_promise || this.candles_promise.stringifiedOptions !== stringifiedOptions) {
                this.candles_promise = {
                    promise: this.requestPipSizes().then(() => this.requestTicks(options)),
                    stringifiedOptions,
                };
            }

            return this.candles_promise.promise;
        }

        return [];
    }
    requestTicks(options) {
        const { symbol, granularity, style } = options;

        return new Promise((resolve, reject) => {
            doUntilDone(() =>
                this.api.getTickHistory(symbol, {
                    subscribe  : 1,
                    end        : 'latest',
                    count      : 1000,
                    granularity: granularity ? Number(granularity) : undefined,
                    style,
                })
            )
                .then(r => {
                    if (style === 'ticks') {
                        const ticks = historyToTicks(r.history);

                        this.updateTicksAndCallListeners(symbol, ticks);
                        resolve(ticks);
                    } else {
                        const candles = parseCandles(r.candles);

                        this.updateCandlesAndCallListeners([symbol, Number(granularity)], candles);
                        resolve(candles);
                    }
                })
                .catch(reject);
        });
    }
}
