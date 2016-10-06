import { observer } from 'binary-common-utils/lib/observer';
import { translator } from '../../../../../common/translator';
import { BlocklyError } from '../../../../../common/error';
import './barrierOffset';
import markets from './markets';
import { bot } from '../../../../bot';
import config from '../../../../../common/const';
import tradeTypes from './tradeTypes';
import { setBlockTextColor } from '../../utils';

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
    setBlockTextColor(this);
    if (!this.isInFlyout && ev.type === 'create') {
      if (bot.symbol.findSymbol(Blockly.mainWorkspace.getBlockById(ev.blockId).type)) {
        observer.emit('tour:submarket_created');
      }
      if (config.conditions.indexOf(Blockly.mainWorkspace.getBlockById(ev.blockId)
          .type) >= 0) {
        observer.emit('tour:condition_created');
      }
      if (Blockly.mainWorkspace.getBlockById(ev.blockId)
          .type === 'math_number') {
        observer.emit('tour:number');
      }
      if (Blockly.mainWorkspace.getBlockById(ev.blockId)
          .type === 'purchase') {
        observer.emit('tour:purchase_created');
      }
      if (Blockly.mainWorkspace.getBlockById(ev.blockId)
          .type === 'trade_again') {
        observer.emit('tour:trade_again_created');
      }
    }
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
    typeof before_purchase === 'undefined' ? function(){} : before_purchase,
    typeof during_purchase === 'undefined' ? function(){} : during_purchase,
    typeof after_purchase === 'undefined' ? function(){} : after_purchase,
    again);
  }`;
  return code;
};

export default () => {
  markets();
  tradeTypes();
};
