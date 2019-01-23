import sma, { simpleMovingAverageArray as smaa } from '@binary-com/binary-indicators/lib/simpleMovingAverage';
import ema, { exponentialMovingAverageArray as emaa } from '@binary-com/binary-indicators/lib/exponentialMovingAverage';
import bb, { bollingerBandsArray as bba } from '@binary-com/binary-indicators/lib/bollingerBands';
import rsi, { relativeStrengthIndexArray as rsia } from '@binary-com/binary-indicators/lib/relativeStrengthIndex';
import macda from '@binary-com/binary-indicators/lib/macd';

export default Interface =>
    class extends Interface {
        getIndicatorsInterface() {
            return {
                sma  : (input, periods) => this.decorate(sma, input, { periods }),
                smaa : (input, periods) => this.decorate(smaa, input, { periods }),
                ema  : (input, periods) => this.decorate(ema, input, { periods }),
                emaa : (input, periods) => this.decorate(emaa, input, { periods }),
                rsi  : (input, periods) => this.decorate(rsi, input, { periods }),
                rsia : (input, periods) => this.decorate(rsia, input, { periods }),
                bb   : (input, config, field) => this.decorate(bb, input, config)[field],
                bba  : (input, config, field) => this.decorate(bba, input, config).map(r => r[field]),
                macda: (input, config, field) => this.decorate(macda, input, config).map(r => r[field]),
            };
        }
        decorate(f, input, config, ...args) {
            const pipSize = this.tradeEngine.getPipSize();

            return f(input, { pipSize, ...config }, ...args);
        }
    };
