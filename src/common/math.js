import simpleMovingAverage,
{ simpleMovingAverageArray } from 'binary-indicators/lib/simpleMovingAverage'
import exponentialMovingAverage,
{ exponentialMovingAverageArray } from 'binary-indicators/lib/exponentialMovingAverage'
import bollingerBands,
{ bollingerBandsArray } from 'binary-indicators/lib/bollingerBands'

export default {
  indicators: {
    simpleMovingAverage,
    simpleMovingAverageArray,
    exponentialMovingAverage,
    exponentialMovingAverageArray,
    bollingerBands,
    bollingerBandsArray,
  },
}
