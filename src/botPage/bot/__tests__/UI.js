import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import Observer from 'binary-common-utils/lib/observer'
import WebSocket from 'ws'
import JSI from '../JSI'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000 * 2

const observer = new Observer()
const api = (new CustomApi(observer, null, null, new WebSocket(
  process.env.ENDPOINT ||
    'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))
const $scope = { observer, api }

const jsi = new JSI($scope)

describe('Run UI generated code', () => {
  let value

  beforeAll(done => {
    jsi.run(`
(function(){
  var trade, before_purchase, during_purchase, after_purchase;

  function run(f, arg) {
    if (f) return f(arg);
    return false;
  }

  var limitations = {}

  var getTradeOptions;
  getTradeOptions = function getTradeOptions() {
    var tradeOptions = {}
    tradeOptions = {
      contractTypes: ['CALL', 'PUT'],
      candleInterval: '60',
      duration: 2,
      duration_unit: 'h',
      basis: 'stake',
      currency: 'USD',
      amount: 1,
      restartOnError: false,
    }
    tradeOptions.symbol = 'R_100'
    return tradeOptions
  }
  trade = function trade(again){
    if (getTradeOptions !== undefined) {
      Bot.start('Xkq6oGFEHh6hJH8', getTradeOptions(),
        again, limitations);
    }
  };

  before_purchase = function before_purchase(){
    Bot.purchase('CALL');
  };

  during_purchase = function during_purchase(){
    if (Bot.isSellAvailable()) {
      Bot.sellAtMarket();
    }
  };

  var count = 2;
  after_purchase = function after_purchase(){
    if (--count !== 0)
      return true;
    return false;
  };

  var again = false;
  while(true) {
    run(trade, again)
    again = true;
    while(watch('before')) {
      run(before_purchase)
    }
    while(watch('during')) {
      run(during_purchase)
    }
    if(!run(after_purchase)) {
      break;
    }
  }
  return count === 0;
})()
    `).then(v => {
      value = v
      done()
    }, e => {
      throw e
    })
  })

  it('return code is correct', () => {
    expect(value).to.be.equal(true)
  })
})

