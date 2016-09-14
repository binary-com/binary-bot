// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qx2zox
import { translator } from '../../../../../common/translator';

Blockly.Blocks.during_purchase = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(2.5) things to do when trade is in progress'));
    this.appendStatementInput('DURING_PURCHASE_STACK')
      .setCheck('SellAtMarket');
    this.setColour('#2a3052');
    this.setTooltip(translator.translateText('Sell at market before a trade is finished'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
