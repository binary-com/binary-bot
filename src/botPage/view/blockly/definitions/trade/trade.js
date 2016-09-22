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

Blockly.JavaScript.trade = (block) => {
  const account = $('#accountSelect').val();
  if (!account) {
    throw Error(translator.translateText('Please login.'));
  }
  const submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
  if (submarket === '') {
    throw Error(translator.translateText('You have to add a submarket first'));
  }
  // TODO: Assemble JavaScript into code variable.
  const code = 'function trade(again){\nBot.start(\'' + account.trim() + '\', '
    + submarket.trim() + ', on_strategy, typeof during_purchase === \'undefined\' ? function(){} : during_purchase, on_finish, again);\n}';
  return code;
};
