import { expect } from 'chai'

import bb, {
  bollingerBandsArray as bba,
} from 'binary-indicators/lib/bollingerBands'
import rsi, {
  relativeStrengthIndexArray as rsia,
} from 'binary-indicators/lib/relativeStrengthIndex'
import ema, {
  exponentialMovingAverageArray as emaa,
} from 'binary-indicators/lib/exponentialMovingAverage'
import sma, {
  simpleMovingAverageArray as smaa,
} from 'binary-indicators/lib/simpleMovingAverage'
import macda from 'binary-indicators/lib/macd'

import { runAndGetResult } from '../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000 * 2

const periods = 12

const bbOption = {
  periods,
  stdDevUp: 5,
  stdDevDown: 5,
}

const macdOption = {
  fastEmaPeriod: 12,
  slowEmaPeriod: 26,
  smaPeriod: 9,
}

const getIndicatorsFromApi = () => runAndGetResult(undefined, `
    watch('before');
    result.ticks = Bot.getTicks() 
    result.rsi = Bot.rsi(Bot.getTicks(), ${periods})
    result.rsia = Bot.rsia(Bot.getTicks(), ${periods})
    result.bb = Bot.bb(Bot.getTicks(), ${JSON.stringify(bbOption)}, 1)
    result.bba = Bot.bba(Bot.getTicks(), ${JSON.stringify(bbOption)}, 2)
    result.ema = Bot.ema(Bot.getTicks(), ${periods})
    result.emaa = Bot.emaa(Bot.getTicks(), ${periods})
    result.macda = Bot.macda(Bot.getTicks(), ${JSON.stringify(macdOption)}, 0)
    result.sma = Bot.sma(Bot.getTicks(), ${periods})
    result.smaa = Bot.smaa(Bot.getTicks(), ${periods})
  `)

describe('Relative Strength Index', () => {
  let result
  let expected

  beforeAll(done =>
    getIndicatorsFromApi().then(r => {
      result = r
      const ticks = result.ticks

      expected = {
        sma: sma(ticks, { periods }),
        smaa: smaa(ticks, { periods }),
        bb: bb(ticks, bbOption)[1],
        bba: bba(ticks, bbOption).map(e => e[2]),
        ema: ema(ticks, { periods }),
        emaa: emaa(ticks, { periods }),
        rsi: rsi(ticks, { periods }),
        rsia: rsia(ticks, { periods }),
        macda: macda(ticks, macdOption).map(e => e[0]),
      }

      done()
    }))

  it('Indicator values are set correctly', () => {
    Object.keys(expected).forEach(name => {
      expect(result[name]).deep.equal(expected[name])
    })
  })
})
