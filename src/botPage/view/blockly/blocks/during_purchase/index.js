// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qx2zox
import { translator } from '../../../../../common/translator';
import './sell_at_market';
import './check_sell';
import './sell_price';
import { setBlockTextColor } from '../../utils';

Blockly.Blocks.during_purchase = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(3) things to do when trade is in progress'));
    this.appendStatementInput('DURING_PURCHASE_STACK')
      .setCheck('SellAtMarket');
    this.setColour('#2a3052');
    this.setTooltip(translator.translateText('Sell at market before a trade is finished')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange() {
    setBlockTextColor(this);
  },
};
Blockly.JavaScript.during_purchase = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'DURING_PURCHASE_STACK');
  const code = `function during_purchase(openContract, purchaseCtrl){
  if(purchaseCtrl === null) return; 
    try {
      ${stack}
    } catch (e) { 
      if (e.name === 'BlocklyError') {
        // pass
      } else {
        throw e;
      }
    }
  }
  `;
  return code;
};
