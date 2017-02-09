import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import JSI from '../JSI'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000 * 2

const header = `
      (function (){
        var result = {};
        Bot.start('Xkq6oGFEHh6hJH8', {
          amount: 1, basis: 'stake', candleInterval: 60,
          contractTypes: '["CALL","PUT"]',
          currency: 'USD', duration: 2,
          duration_unit: 'h', symbol: 'R_100',
        }, false);
`

const footer = `
        return {
          result: result,
        };
      })();
`

const createJsi = () => {
  const observer = new Observer()
  const api = new CustomApi(observer, null, null,
    new WebSocket(process.env.ENDPOINT ||
      'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0'))

  const $scope = { observer, api }

  return new JSI($scope)
}

describe('Tick Blocks', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
        var context = watch('before');
        result.lastOhlc = Bot.getOhlcFromEnd();
        result.ohlc = Bot.getOhlc();
        result.candleValues = Bot.getOhlc('close');
        result.lastCloseValue1 = Bot.getOhlcFromEnd('close', 2);
        result.lastCloseValue2 = Bot.getOhlcFromEnd('close');
        result.ticks = Bot.getTicks();
        result.lastTick = Bot.getLastTick();
        result.lastDigit = Bot.getLastDigit();
      ${footer}
    `).then(v => {
      value = v
      done()
    })
  })

  it('ticks api', () => {
    const expectedResultTypes = [
      'object', // last candle
      'object', // candles list
      'object', // candle values list
      'number', // last close value
      'number', // previous close value
      'object', // ticks
      'number', // last tick
      'number', // last digit
    ]

    const { result } = value
    const resultTypes = Object.keys(result).map(k => typeof result[k])

    expect(resultTypes).deep.equal(expectedResultTypes)
  })
})

describe('Before Purchase Blocks', () => {
  let value

  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
        while (testScope(context = watch('before'), 'before')) {
          result.askPrice = Bot.getAskPrice('CALL');
          result.payout = Bot.getPayout('CALL');
          Bot.purchase('CALL');
        }
      ${footer}
    `).then(v => {
      value = v
      done()
    })
  })

  it('before purchase api', () => {
    const expectedResultTypes = [
      'number', // ask price
      'number', // payout
    ]

    const { result } = value
    const resultTypes = Object.keys(result).map(k => typeof result[k])

    expect(resultTypes).deep.equal(expectedResultTypes)
  })
})

describe('During Purchase Blocks', () => {
  let value

  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
        watch('before')
        Bot.purchase('CALL')
        while (testScope(context = watch('during'), 'during')) {
          result.sellAvailable = Bot.isSellAvailable();
          result.sellPrice = Bot.getSellPrice();
          Bot.sellAtMarket();
        }
      ${footer}
    `).then(v => {
      value = v
      done()
    })
  })

  it('before purchase api', () => {
    const expectedResultTypes = [
      'boolean', // is sell available
      'number', // sell price
    ]

    const { result } = value
    const resultTypes = Object.keys(result).map(k => typeof result[k])

    expect(resultTypes).deep.equal(expectedResultTypes)
  })
})

describe('After Purchase Blocks', () => {
  let value

  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
        watch('before')
        Bot.purchase('CALL')
        while (testScope(context = watch('during'), 'during')) {
          Bot.sellAtMarket();
        }
        result.isWin = Bot.isResult('win');
        result.detail = Bot.readDetails(1);
      ${footer}
    `).then(v => {
      value = v
      done()
    })
  })

  it('before purchase api', () => {
    const expectedResultTypes = [
      'boolean', // is result win
      'string', // statement
    ]

    const { result } = value
    const resultTypes = Object.keys(result).map(k => typeof result[k])

    expect(resultTypes).deep.equal(expectedResultTypes)
  })
})
