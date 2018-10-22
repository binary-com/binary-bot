import { Map } from 'immutable';
import { doUntilDone } from '../bot/tools';
import TicksService from './TicksService';

export default class SmartChartTicksService extends TicksService {
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
            listeners.forEach(callback => callback(ticks));
        }
    }

    updateCandlesAndCallListeners(address, candles) {
        if (this.ticks.getIn(address) === candles) {
            return;
        }
        this.candles = this.candles.setIn(address, candles);

        const listeners = this.ohlcListeners.getIn(address);

        if (listeners) {
            listeners.forEach(callback => callback(candles));
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
                this.updateTicksAndCallListeners(symbol, r);
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
                this.updateCandlesAndCallListeners(address, r);
            }
        });
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
                        // const ticks = historyToTicks(r.history);
                        this.updateTicksAndCallListeners(symbol, r);
                        // resolve(ticks);
                    } else {
                        // const candles = parseCandles(r.candles);
                        this.updateCandlesAndCallListeners([symbol, Number(granularity)], r);
                        // resolve(candles);
                    }
                })
                .catch(reject);
        });
    }
}
