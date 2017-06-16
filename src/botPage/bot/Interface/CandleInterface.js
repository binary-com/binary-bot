import { expectCandle, expectCandles } from '../sanitize';

export default Interface =>
    class extends Interface {
        // eslint-disable-next-line class-methods-use-this
        getCandleInterface() {
            return {
                isCandleBlack: candle => expectCandle(candle) && candle.close < candle.open,
                candleValues : (ohlc, field) => expectCandles(ohlc).map(o => o[field]),
                candleField  : (candle, field) => expectCandle(candle)[field],
            };
        }
    };
