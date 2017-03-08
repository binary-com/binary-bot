import { translate } from '../../../common/i18n'
import { expectPositiveInteger } from '../sanitize'

export default Interface => class extends Interface {
  getTicksInterface() {
    const getLastTick = () => this.getTicks().slice(-1)[0]

    return {
      getLastTick,
      getLastDigit: () => +(getLastTick().toFixed(this.getPipSize()).slice(-1)[0]),
      getOhlcFromEnd: (field, index = 1) => {
        const sanitizedIndex =
          expectPositiveInteger(index,
            translate('OHLC index must be a positive integer'))

        const lastOhlc = this.getOhlc().slice(-sanitizedIndex)[0]

        return field ? lastOhlc[field] : lastOhlc
      },
      getOhlc: (field) => this.getOhlc(field),
      getTicks: () => this.getTicks(),
      checkDirection: w => this.tradeEngine.getData().data.ticksObj.direction === w,
    }
  }
  getOhlc(field) {
    const ohlc = this.tradeEngine.getData().data.ticksObj.ohlc

    return field ? ohlc.map(o => o[field]) : ohlc
  }
  getTicks() {
    return this.tradeEngine.getData().data.ticksObj.ticks.map(o => o.quote)
  }
  getPipSize() {
    return this.tradeEngine.getData().data.ticksObj.pipSize
  }
}
