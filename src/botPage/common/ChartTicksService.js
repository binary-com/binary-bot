import { doUntilDone } from '../bot/tools';
import TicksService from './TicksService';

export default class ChartTicksService extends TicksService {
    observe() {
        this.api.events.on('tick', r => {
            const { tick: { symbol, id } } = r;

            if (this.ticks.has(symbol)) {
                this.subscriptions = this.subscriptions.setIn(['tick', symbol], id);
                this.updateTicksAndCallListeners(symbol, r);
            }
        });

        this.api.events.on('ohlc', r => {
            const { ohlc: { symbol, granularity, id } } = r;

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
                        this.updateTicksAndCallListeners(symbol, r);
                    } else {
                        this.updateCandlesAndCallListeners([symbol, Number(granularity)], r);
                    }
                })
                .catch(reject);
        });
    }
}
