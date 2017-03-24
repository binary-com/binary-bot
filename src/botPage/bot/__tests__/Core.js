import { expectReturnTrue, parts } from './tools'


expectReturnTrue('Main Blocks', `
      (function (){
        ${parts.trade}
        ${parts.waitToPurchase}
        ${parts.waitToSell}
        return true;
      })();
  `)

expectReturnTrue('Main Blocks - Multiple Trades', `
      (function (){
        var count = 5;
        while(true) {
          ${parts.trade}
          ${parts.waitToPurchase}
          ${parts.waitToSell}
          if (--count === 0) {
            break;
          }
        }
        return count === 0;
      })();
  `)

expectReturnTrue('Main Blocks - Sell Expired', `
      (function (){
        Bot.start('Xkq6oGFEHh6hJH8', {
          amount: 1, basis: 'stake', candleInterval: 60,
          contractTypes: ['CALL', 'PUT'],
          currency: 'USD', duration: 5,
          duration_unit: 't', symbol: 'R_100',
        });
        ${parts.waitToPurchase}
        while (watch('during')) {}
        return true;
      })();
  `)
