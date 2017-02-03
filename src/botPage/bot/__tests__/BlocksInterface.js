import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import JSI from '../JSI'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000 * 2

const observer = new Observer()
const api = (new CustomApi(observer, null, null, new WebSocket(
  process.env.ENDPOINT ||
    'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))
const $scope = { observer, api }

const jsi = new JSI($scope)

describe('Blocks Api', () => {
  let value

  beforeAll(done => {
    jsi.run(`
      (function (){
        var count = 2;
        var again = false;
        var result = {};
        var ticksResult = {};
        while(true) {
          Bot.start('Xkq6oGFEHh6hJH8', {
            amount: 1, basis: 'stake', candleInterval: 60,
            contractTypes: '["CALL","PUT"]',
            currency: 'USD', duration: 2,
            duration_unit: 'h', symbol: 'R_100',
          }, again);
          var context = wait('CONTEXT');
          if (!again) {
            ticksResult.lastOhlc = Bot.getOhlcFromEnd();
            ticksResult.ohlc = Bot.getOhlc();
            ticksResult.candleValues = Bot.getOhlc('close');
            ticksResult.lastCloseValue1 = Bot.getOhlcFromEnd('close', 2);
            ticksResult.lastCloseValue2 = Bot.getOhlcFromEnd('close');
            ticksResult.ticks = Bot.getTicks();
            ticksResult.lastTick = Bot.getLastTick();
            ticksResult.lastDigit = Bot.getLastDigit();
            result.askPrice = Bot.getAskPrice('CALL');
            result.payout = Bot.getPayout('CALL');
          }
          Bot.purchase('CALL');
          while ((context = wait('CONTEXT')).scope === 'during') {
            if (!again) {
              result.sellAvailable = Bot.isSellAvailable();
              result.sellPrice = Bot.getSellPrice();
            }
            Bot.sellAtMarket();
          }
          result.isWin = Bot.isResult('win');
          result.detail = Bot.readDetails(1);
          if (--count === 0) {
            break;
          }
          again = true;
        }
        return {
          result: result,
          ticksResult: ticksResult,
        };
      })();
    `).then(v => {
      value = v
      done()
    })
  })

  it('ticks api', () => {
    const expectedTicksResult = [
      'object', // last candle
      'object', // candles list
      'object', // candle values list
      'number', // last close value
      'number', // previous close value
      'object', // ticks
      'number', // last tick
      'number', // last digit
    ]

    const { ticksResult: result } = value
    const ticksResult = Object.keys(result).map(k => typeof result[k])

    expect(ticksResult).deep.equal(expectedTicksResult)
  })

  it('global api', () => {
    const expectedResult = [
      'number', // askPrice
      'number', // payout
      'boolean', // isSellAvailable
      'number', // sellPrice
      'boolean', // isWin
      'string', // statement
    ]

    const { result } = value
    const mainResult = Object.keys(result).map(k => typeof result[k])

    expect(mainResult).deep.equal(expectedResult)
  })
})

