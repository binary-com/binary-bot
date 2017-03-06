import { expect } from 'chai'
import { runAndGetResult, expectResultTypes } from '../tools'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

describe('Ticks Analysis', () => {
  let result

  beforeAll(done => {
    runAndGetResult(`
      result.ticks = []
      function ta() {
        result.ticks.push(Bot.getLastTick());
      }
    `, `
      watch('before');
      ta()
      Bot.purchase('CALL')
      while (watch('during')) {
        ta()
        Bot.sellAtMarket()
      }
      ta()
    `).then(v => {
      result = v
      done()
    })
  })

  it('tick analysis block', () => {
    const { ticks } = result

    expect(ticks).satisfy(t => t.length >= 3 && t.every(n => Number.isFinite(n)))
  })
})

describe('Tick Blocks', () => {
  let result

  beforeAll(done => {
    runAndGetResult(undefined, `
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
  `).then(v => {
    result = v
    done()
  })
  })

  it('ticks api', () => {
    expectResultTypes(result, [
      'number', // last tick
      'number', // last digit
      'object', // last candle
      'boolean', // is tick direction up

      'object', // candles list
      'object', // ticks
      'object', // candle values list
      'number', // last close value
      'number', // previous close value
    ])
  })
})
