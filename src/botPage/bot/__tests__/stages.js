import { expectReturnTrue, parts } from './shared'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 18000 * 2

expectReturnTrue('Stage 1 - Before Purchase', `
      (function (){
        ${parts.trade}
        watch('before');
        return isInside('before');
      })();
  `)

expectReturnTrue('Stage 2 - After Purchase Before Open Proposal', `
      (function (){
        ${parts.trade}
        ${parts.waitToPurchase}
        return !isInside('before');
      })();
  `)

expectReturnTrue('Stage 3 - Before Sell', `
      (function (){
        ${parts.trade}
        ${parts.waitToPurchase}
        watch('during');
        return isInside('during');
      })();
  `)

expectReturnTrue('Stage 4 - After Sell', `
      (function (){
        ${parts.trade}
        ${parts.waitToPurchase}
        ${parts.waitToSell}
        return isInside('after');
      })();
  `)
