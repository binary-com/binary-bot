// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u7tjez
import { translator } from '../../../../../common/translator';

Blockly.Blocks.on_strategy = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(2) things to do before purchase is made'));
    this.appendStatementInput('STRATEGY_STACK')
      .setCheck('Purchase');
    this.setColour('#2a3052');
    this.setTooltip(translator.translateText('This block decides what to do each time a new tick is received'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
