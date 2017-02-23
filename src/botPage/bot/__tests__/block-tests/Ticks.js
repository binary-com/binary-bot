import { expect } from 'chai'
import { createJsi, header, trade, footer } from './shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Ticks Analysis', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      result.ticks = []
      function ta() {
        result.ticks.push(Bot.getLastTick());
      }
      ${trade}
        watch('before');
        ta()
        Bot.purchase('CALL')
        while (watch('during')) {
          ta()
          Bot.sellAtMarket()
        }
        ta()
      ${footer}
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })

  it('tick analysis block', () => {
    const { result: { ticks } } = value

    expect(ticks).satisfy(t =>
      t.length >= 3 && t.reduce((a, b) => a && typeof b === 'number', true))
  })
})

describe('Tick Blocks', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        watch('before');
        result.lastTick = Bot.getLastTick();
        result.lastDigit = Bot.getLastDigit();
        result.lastOhlc = Bot.getOhlcFromEnd();
        result.isTickDirUp = Bot.checkDirection('rise')

        result.ohlc = Bot.getOhlc();
        result.ticks = Bot.getTicks();
        result.candleValues = Bot.getOhlc('close');
        result.lastCloseValue1 = Bot.getOhlcFromEnd('close', 2);
        result.lastCloseValue2 = Bot.getOhlcFromEnd('close');
      ${footer}
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })

  it('ticks api', () => {
    const expectedResultTypes = [
      'number', // last tick
      'number', // last digit
      'object', // last candle
      'boolean', // is tick direction up

      'object', // candles list
      'object', // ticks
      'object', // candle values list
      'number', // last close value
      'number', // previous close value
    ]

    const { result } = value
    const resultTypes = Object.keys(result).map(k => typeof result[k])

    expect(resultTypes).deep.equal(expectedResultTypes)
  })
})
