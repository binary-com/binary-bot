import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import JSI from '../JSI'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000 * 2

const header = `
      var again = false;
      (function (){
`

const trade = `
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

describe('Before Purchase Blocks', () => {
  let value

  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        while (testScope(context = watch('before'), 'before')) {
          result.payout = Bot.getPayout('CALL');
          result.askPrice = Bot.getAskPrice('CALL');
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
      'number', // payout
      'number', // ask price
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
      ${trade}
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
      function tradeAgain() {
        if (!again) {
          again = true
          return true;
        }
        return false;
      }
      while (true) {
        ${trade}
        watch('before')
        Bot.purchase('CALL')
        while (testScope(context = watch('during'), 'during')) {
          Bot.sellAtMarket();
        }
        result.isWin = Bot.isResult('win');
        result.detail = Bot.readDetails(1);
        if (!tradeAgain()) {
          break;
        }
      }
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

describe('Tick Blocks', () => {
  let value
  const jsi = createJsi()

  beforeAll(done => {
    jsi.run(`
      ${header}
      ${trade}
        var context = watch('before');
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
