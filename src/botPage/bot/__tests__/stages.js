import { expectReturnTrue, parts } from './tools'


expectReturnTrue('Stage 1 - Before Purchase', `
      (function (){
        ${parts.trade}
        watch('before');
        return true;
      })();
  `)

expectReturnTrue('Stage 2 - After Purchase Before Open Proposal', `
      (function (){
        ${parts.trade}
        ${parts.waitToPurchase}
        return true;
      })();
  `)

expectReturnTrue('Stage 3 - Before Sell', `
      (function (){
        ${parts.trade}
        ${parts.waitToPurchase}
        watch('during');
        return true;
      })();
  `)

expectReturnTrue('Stage 4 - After Sell', `
      (function (){
        ${parts.trade}
        ${parts.waitToPurchase}
        ${parts.waitToSell}
        return true;
      })();
  `)
