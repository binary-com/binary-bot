import sma, {
  simpleMovingAverageArray as smaa,
} from 'binary-indicators/lib/simpleMovingAverage'
import ema, {
  exponentialMovingAverageArray as emaa,
} from 'binary-indicators/lib/exponentialMovingAverage'
import bb, {
  bollingerBandsArray as bba,
} from 'binary-indicators/lib/bollingerBands'
import rsi, {
  relativeStrengthIndexArray as rsia,
} from 'binary-indicators/lib/relativeStrengthIndex'
import macda from 'binary-indicators/lib/macd'

export default class Indicators {
  constructor($scope) {
    this.CM = $scope.CM
  }
  decorate(f, input, config, ...args) {
    const pipSize = this.CM.getLastContext().data.ticksObj.pipSize
    return f(input, Object.assign({ pipSize }, config), ...args)
  }
  getInterface() {
    return {
      sma: (...args) => this.decorate(sma, ...args),
      smaa: (...args) => this.decorate(smaa, ...args),
      ema: (...args) => this.decorate(ema, ...args),
      emaa: (...args) => this.decorate(emaa, ...args),
      bb: (input, config, field) => this.decorate(bb, input, config)[field],
      bba: (input, config, field) =>
        this.decorate(bba, input, config).map(r => r[field]),
      rsi: (...args) => this.decorate(rsi, ...args),
      rsia: (...args) => this.decorate(rsia, ...args),
      macda: (input, config, field) =>
        this.decorate(macda, config, field).map(r => r[field]),
    }
  }
}
