// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
import { translator } from '../../../../../common/translator'

Blockly.Blocks.block_holder = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Blocks inside are ignored'))
    this.appendStatementInput('USELESS_STACK')
      .setCheck(null)
    this.setColour('#fef1cf')
    this.setTooltip(translator.translateText('Put your blocks in here to prevent them from being removed'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}
Blockly.JavaScript.block_holder = () => ''
