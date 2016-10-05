import { translator } from '../../../../../common/translator';
import { trade } from '../../relationChecker';
import { BlocklyError } from '../../../../../common/error';

import './barrierOffset';
import markets from './markets';
import tradeTypes from './tradeTypes';

Blockly.Blocks.trade = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(1) Define your contract here'));
    this.appendStatementInput('SUBMARKET')
      .setCheck('Submarket');
    this.setPreviousStatement(true, null);
    this.setColour('#2a3052');
    this.setTooltip(translator.translateText('Use this block to choose markets and trade types.')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    trade(this, ev);
  },
};

Blockly.JavaScript.trade = (block) => {
  const account = $('#accountSelect').val();
  if (!account) {
    return new BlocklyError(translator.translateText('Please login.')).emit();
  }
  const initialization = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
  // TODO: Assemble JavaScript into code variable.
  const code = `
  var tradeOption = {};
  ${initialization.trim()};
  function trade(again){
    Bot.start('${account.trim()}', tradeOption,
    on_strategy, typeof during_purchase === 'undefined' ? function(){} : during_purchase,
    on_finish, again);
  }`;
  return code;
};

export default () => {
  markets();
  tradeTypes();
};
