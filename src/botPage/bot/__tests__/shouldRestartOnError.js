import { expectReturnTrue, parts, init, start } from './tools';

expectReturnTrue(
    'Main Blocks - Restart On Error',
    `
      (function (){
        ${init('shouldRestartOnError: true')}
        ${start('duration: 2, duration_unit: "h"')}
        ${parts.waitToPurchase}
        // no watch for during here!
        sleep(2)
        Bot.sellAtMarket()
        return true;
      })();
  `
);
