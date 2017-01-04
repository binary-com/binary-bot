import { translate } from '../../../../../common/i18n'
import { tickScope } from '../../relationChecker'
import config from '../../../../../common/const'

Blockly.Blocks.check_direction = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translate('Direction is'))
      .appendField(new Blockly.FieldDropdown(config.lists.CHECK_DIRECTION), 'CHECK_DIRECTION')
    this.setOutput(true, 'Boolean')
    this.setColour('#f2f2f2')
    this.setTooltip(translate('True if the direction matches the selection'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    tickScope(this, ev, 'Check Direction')
  },
}
Blockly.JavaScript.check_direction = (block) => {
  const checkWith = block.getFieldValue('CHECK_DIRECTION')
  const code = `(this.ticks.direction === '${checkWith}')`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
