// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
import { translator } from '../../../../../common/translator';
import './result';
import './check_result';
import './details';
import './read_details';
import './trade_again';
import { configMainBlock, setBlockTextColor } from '../../utils';

Blockly.Blocks.after_purchase = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(4) things to do after purchase is finished'));
    this.appendStatementInput('AFTERPURCHASE_STACK')
      .setCheck('TradeAgain');
    this.setColour('#2a3052');
    this.setTooltip(translator.translateText('This block decides what to do when a purchased contract is finished')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    if (ev.type === 'create') {
      setBlockTextColor(this);
    }
    configMainBlock(ev, 'after_purchase');
  },
};
Blockly.JavaScript.after_purchase = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'AFTERPURCHASE_STACK');
  const code = `function after_purchase(_finishedContract, details){
    try {
      ${stack}
    } catch (e) { 
      if (e.name === 'BlocklyError') {
        // pass
      } else {
        throw e;
      }
    }
    Bot.stop();
  }
  `;
  return code;
};
