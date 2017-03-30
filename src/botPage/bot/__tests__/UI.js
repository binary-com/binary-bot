import { expectReturnTrue } from './tools'


expectReturnTrue('UI Generated Code', `
   (function(){
        var trade, before_purchase, during_purchase, after_purchase;

        var tick_analysis_list = [];

        function run(f, arg) {
          if (f) return f(arg);
          return false;
        }

        function tick_analysis() {
          for (var i = 0; i < tick_analysis_list.length; i++) {
            run(tick_analysis_list[i]);
          }
        }

        var limitations = {};

        var start;

          start = function start() {
          Bot.start({
            limitations: limitations,
            duration: 2,
            duration_unit: 'h',
            currency: 'USD',
            amount: 1,
            prediction: undefined,
            barrierOffset: undefined,
            secondBarrierOffset: undefined,
          });
        }
  trade = function trade(){
    Bot.init('Xkq6oGFEHh6hJH8', {
      symbol: 'R_100',
      contractTypes: ["CALL","PUT"],
      candleInterval: '60',
    });
  };

before_purchase = function before_purchase(){
      Bot.purchase('CALL');

  };

during_purchase = function during_purchase(){
      if (Bot.isSellAvailable()) {
        Bot.sellAtMarket();
      }

  };

  var count = 3;
after_purchase = function after_purchase(){
    if (--count === 0) {
      return false;
    }
    return true;
  };


        run(trade)
        while(true) {
          run(start)
          while(watch('before')) {
            tick_analysis();
            run(before_purchase);
          }
          while(watch('during')) {
            tick_analysis();
            run(during_purchase);
          }
          tick_analysis();
          if(!run(after_purchase)) {
            break;
          }
        }
        return count === 0
      })();`)

