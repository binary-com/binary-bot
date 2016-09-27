// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
import { translator } from '../../../../../common/translator';

Blockly.Blocks.sell_at_market = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Sell at market'));
    this.setPreviousStatement(true, 'SellAtMarket');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Sell at market.')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
Blockly.JavaScript.sell_at_market = () => `purchaseCtrl.sellAtMarket();\n`;
