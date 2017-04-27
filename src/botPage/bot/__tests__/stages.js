import { expectReturnTrue, parts } from './tools';

expectReturnTrue(
    'Stage 1 - Before Purchase',
    `
      (function (){
        ${parts.tickTrade}
        watch('before');
        return true;
      })();
  `
);

expectReturnTrue(
    'Stage 2 - After Purchase Before Open Proposal',
    `
      (function (){
        ${parts.tickTrade}
        ${parts.waitToPurchase}
        return true;
      })();
  `
);

expectReturnTrue(
    'Stage 3 - Before Sell',
    `
      (function (){
        ${parts.tickTrade}
        ${parts.waitToPurchase}
        watch('during');
        return true;
      })();
  `
);

expectReturnTrue(
    'Stage 4 - After Sell',
    `
      (function (){
        ${parts.tickTrade}
        ${parts.waitToPurchase}
        ${parts.waitToSell}
        return true;
      })();
  `
);
