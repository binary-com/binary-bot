import { expectReturnTrue } from './tools'


expectReturnTrue('UI Generated Code', `
(function(){
  var trade, before_purchase, during_purchase, after_purchase;

  function run(f) {
    if (f) return f();
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
  trade = function trade(){
    if (getTradeOptions !== undefined) {
      Bot.start('Xkq6oGFEHh6hJH8', getTradeOptions(), limitations);
    }
  };

  before_purchase = function before_purchase(){
    return Bot.purchase('CALL');
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

  while(true) {
    run(trade)
    while(watch('before')) {
      if (run(before_purchase)) {
        break
      }
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
  `)

