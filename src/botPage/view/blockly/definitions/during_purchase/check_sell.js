// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { translator } from '../../../../../common/translator';

Blockly.Blocks.check_sell = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Sell is available'));
    this.setOutput(true, 'Boolean');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('True if sell at market is available'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
