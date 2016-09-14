import { translator } from '../../../../../common/translator';
import { trade } from '../../relationChecker';

Blockly.Blocks.trade = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(1) Define your contract here'));
    this.appendStatementInput('SUBMARKET')
      .setCheck('Submarket');
    this.setPreviousStatement(true, null);
    this.setColour('#2a3052');
    this.setTooltip(translator.translateText('Use this block to choose markets and trade types.'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    trade(this, ev);
  },
};
