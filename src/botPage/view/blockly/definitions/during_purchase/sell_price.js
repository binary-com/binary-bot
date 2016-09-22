import { translator } from '../../../../../common/translator';

Blockly.Blocks.sell_price = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Sell profit/loss'));
    this.setOutput(true, 'Number');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Returns the profit for sell at market.'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
Blockly.JavaScript.sell_price = () => {
  const code = '(+(Number(openContract.bid_price) - Number(openContract.buy_price)).toFixed(2))';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
