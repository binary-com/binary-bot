// Maintained for Backward Compatibility
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yn3rh2
import config from '../../../../../common/const'
import { translator } from '../../../../../common/translator'

Blockly.Blocks.barrier_offset = {
  init: function init() {
    this.appendValueInput('BARRIEROFFSET_IN')
      .setCheck('Number')
      .appendField(new Blockly.FieldDropdown(config.barrierTypes), 'BARRIEROFFSETTYPE_LIST')
    this.setInputsInline(false)
    this.setOutput(true, 'Number')
    this.setColour('#dedede')
    this.setTooltip(translator.translateText('Add sign to a number to make a Barrier Offset.'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}
Blockly.JavaScript.barrier_offset = () => ''
