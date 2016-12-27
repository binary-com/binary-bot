import config from '../../../../../common/const'
import { insideAfterPurchase } from '../../relationChecker'
import { translator } from '../../../../../common/translator'

Blockly.Blocks.contract_check_result = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Result is'))
      .appendField(new Blockly.FieldDropdown(config.lists.CHECK_RESULT), 'CHECK_RESULT')
    this.setOutput(true, 'Boolean')
    this.setColour('#f2f2f2')
    this.setTooltip(translator.translateText('True if the result matches the selection'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    insideAfterPurchase(this, ev, 'Check Result')
  },
}
Blockly.JavaScript.contract_check_result = (block) => {
  const checkWith = block.getFieldValue('CHECK_RESULT')
  const code = `(this.contractDetails[10] === '${checkWith}')`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
