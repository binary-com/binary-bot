import { expect } from 'chai'
import CustomApi from 'binary-common-utils/lib/customApi'
import WebSocket from 'ws'
import JSI from '../jsi'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 35000

describe('Run JSI over simple calculation', () => {
  let value

  const api = (new CustomApi(null, null, new WebSocket(
    process.env.ENDPOINT ||
      'wss://ws.binaryws.com/websockets/v3?l=en&app_id=0')))

  beforeAll(done => {
    const jsi = new JSI(api)
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
      contractTypes: '["CALL","PUT"]',
      candleInterval: '60',
      duration: 5,
      duration_unit: 't',
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
      Bot.start('a1-MzkoEzxzsY75VGCsv7SlbkHizJp1P', getTradeOptions(),
        again, limitations);
    }
  };

  before_purchase = function before_purchase(){
    Bot.purchase('CALL');

  };

  during_purchase = function during_purchase(){
    if (Bot.isSellAvailable()) {
    }

  };

  var count = 2;
  after_purchase = function after_purchase(){
    if (--count !== 0)
      return true;
    return false;
  };


  var context

  var again = false;
  while(true) {
    run(trade, again)
    again = true;
    while((context = wait('CONTEXT')).scope === 'before') {
      run(before_purchase)
    }
    while((context = wait('CONTEXT')).scope === 'during') {
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
    })
  })

  it('return code is correct', () => {
    expect(value.data).to.be.equal(true)
  })
})

