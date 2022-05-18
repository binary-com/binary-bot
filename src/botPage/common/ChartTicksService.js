import { doUntilDone } from "../bot/tools";
import TicksService from "./TicksService";

export default class ChartTicksService extends TicksService {
  observe() {
    this.api.onMessage().subscribe(({ data }) => {
      if (data?.error?.code) {
        return;
      }
      if (data?.msg_type === "tick") {
        const {
          tick: { symbol, id },
        } = data;
        if (this.ticks.has(symbol)) {
          this.subscriptions = this.subscriptions.setIn(["tick", symbol], id);
          this.updateTicksAndCallListeners(symbol, data);
        }
      }

      if (data?.msg_type === "ohlc") {
        const {
          ohlc: { symbol, granularity, id },
        } = data;

        if (this.candles.hasIn([symbol, Number(granularity)])) {
          this.subscriptions = this.subscriptions.setIn(["ohlc", symbol, Number(granularity)], id);
          const address = [symbol, Number(granularity)];
          this.updateCandlesAndCallListeners(address, data);
        }
      }
    });
  }

  requestTicks(options) {
    const { symbol, granularity, style } = options;
    const request_object = {
      ticks_history: symbol,
      subscribe: 1,
      end: "latest",
      count: 1000,
      granularity: granularity ? Number(granularity) : undefined,
      style,
    };

    return new Promise((resolve, reject) => {
      doUntilDone(() => this.api.send(request_object))
        .then(r => {
          if (style === "ticks") {
            this.updateTicksAndCallListeners(symbol, r);
          } else {
            this.updateCandlesAndCallListeners([symbol, Number(granularity)], r);
          }
        })
        .catch(reject);
    });
  }
}
