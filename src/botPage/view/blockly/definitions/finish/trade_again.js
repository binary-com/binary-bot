// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xkasg4
import { translator } from '../../../../../common/translator';
import { insideFinish } from '../../relationChecker';

Blockly.Blocks.trade_again = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Trade Again'));
    this.setPreviousStatement(true, 'TradeAgain');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Runs the trade block again'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    insideFinish(this, ev, 'Trade Again');
  },
};
