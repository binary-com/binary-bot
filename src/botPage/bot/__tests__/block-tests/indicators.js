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

import { runAndGetResult } from '../shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

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
  let ticks

  const expectIndicatorResult = (name, expected) => {
    it(name, () => {
      const { [name]: recvd } = result

      expect(recvd).deep.equal(expected)
    })
  }

  beforeAll(done =>
    getIndicatorsFromApi().then(r => {
      result = r
      ticks = result.ticks
      done()
    }))

  expectIndicatorResult('bb', bb(ticks, bbOption)[1])

  expectIndicatorResult('bba', bba(ticks, bbOption).map(e => e[2]))

  expectIndicatorResult('ema', ema(ticks, { periods }))

  expectIndicatorResult('emaa', emaa(ticks, { periods }))

  expectIndicatorResult('rsi', rsi(ticks, { periods }))

  expectIndicatorResult('rsia', rsia(ticks, { periods }))

  expectIndicatorResult('macda', macda(ticks, macdOption).map(e => e[0]))

  expectIndicatorResult('sma', sma(ticks, { periods }))

  expectIndicatorResult('smaa', smaa(ticks, { periods }))
})
