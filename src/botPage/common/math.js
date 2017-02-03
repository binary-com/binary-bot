import simpleMovingAverage, { simpleMovingAverageArray } from 'binary-indicators/lib/simpleMovingAverage'
import exponentialMovingAverage, { exponentialMovingAverageArray } from 'binary-indicators/lib/exponentialMovingAverage'
import bollingerBands, { bollingerBandsArray } from 'binary-indicators/lib/bollingerBands'
import relativeStrengthIndex, { relativeStrengthIndexArray } from 'binary-indicators/lib/relativeStrengthIndex'
import macdArray from 'binary-indicators/lib/macd'
import { bot } from '../botPage/bot'

const decorateWithPipSize = f =>
  (input, config, ...args) => f(input, Object.assign({ pipSize: bot.pipSize }, config), ...args)

export default {
  indicators: {
    simpleMovingAverage: decorateWithPipSize(simpleMovingAverage),
    simpleMovingAverageArray: decorateWithPipSize(simpleMovingAverageArray),
    exponentialMovingAverage: decorateWithPipSize(exponentialMovingAverage),
    exponentialMovingAverageArray: decorateWithPipSize(exponentialMovingAverageArray),
    bollingerBands: decorateWithPipSize(bollingerBands),
    bollingerBandsArray: decorateWithPipSize(bollingerBandsArray),
    relativeStrengthIndex: decorateWithPipSize(relativeStrengthIndex),
    relativeStrengthIndexArray: decorateWithPipSize(relativeStrengthIndexArray),
    macdArray: decorateWithPipSize(macdArray),
  },
}
