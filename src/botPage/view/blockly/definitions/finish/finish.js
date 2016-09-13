// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
import { translator } from '../../../../../common/translator';

Blockly.Blocks.on_finish = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(3) things to do after purchase is finished'));
    this.appendStatementInput('FINISH_STACK')
      .setCheck('TradeAgain');
    this.setColour('#2a3052');
    this.setTooltip(translator.translateText('This block decides what to do when a purchased contract is finished'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
