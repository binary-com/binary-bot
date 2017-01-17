import simpleMovingAverage, { simpleMovingAverageArray } from 'binary-indicators/lib/simpleMovingAverage'
import exponentialMovingAverage, { exponentialMovingAverageArray } from 'binary-indicators/lib/exponentialMovingAverage'
import bollingerBands, { bollingerBandsArray } from 'binary-indicators/lib/bollingerBands'
import relativeStrengthIndex, { relativeStrengthIndexArray } from 'binary-indicators/lib/relativeStrengthIndex'
import macdArray from 'binary-indicators/lib/macd'

export default {
  indicators: {
    simpleMovingAverage,
    simpleMovingAverageArray,
    exponentialMovingAverage,
    exponentialMovingAverageArray,
    bollingerBands,
    bollingerBandsArray,
    relativeStrengthIndex,
    relativeStrengthIndexArray,
    macdArray,
  },
}
