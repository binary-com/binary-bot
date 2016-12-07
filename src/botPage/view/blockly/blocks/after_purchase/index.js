// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
import { translator } from '../../../../../common/translator'
import './result'
import './check_result'
import './details'
import './read_details'
import './trade_again'
import { configMainBlock, setBlockTextColor } from '../../utils'
import { finishSign } from '../images'

Blockly.Blocks.after_purchase = {
  init: function init() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage(finishSign, 15, 15, 'F'))
      .appendField(translator.translateText('(4) Get your trade result and trade again'))
    this.appendStatementInput('AFTERPURCHASE_STACK')
      .setCheck('TradeAgain')
    this.setColour('#2a3052')
    this.setTooltip(translator.translateText('Get the previous trade information and result, then trade again (Runs on trade finish)'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    if (ev.type === 'create') {
      setBlockTextColor(this)
    }
    configMainBlock(ev, 'after_purchase')
  },
}
Blockly.JavaScript.after_purchase = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'AFTERPURCHASE_STACK')
  const code = `after_purchase = function after_purchase(){
    try {
      Blockly.mainWorkspace.getBlockById('${block.id}').select()
      ${stack}
    } catch (e) {
      if (e.name !== 'BlocklyError') {
        Bot.notifyError(e);
        throw e;
      }
    }
    Bot.stop();
  };
  `
  return code
}
