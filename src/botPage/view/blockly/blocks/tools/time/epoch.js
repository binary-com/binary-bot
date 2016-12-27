// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4
import { translator } from '../../../../../../common/translator'

Blockly.Blocks.epoch = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Seconds Since Epoch'))
    this.setOutput(true, 'Number')
    this.setColour('#dedede')
    this.setTooltip(translator.translateText('Returns the epoch time (seconds since epoch)'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}
Blockly.JavaScript.epoch = () => [
  '(parseInt((new Date().getTime())/1000))', Blockly.JavaScript.ORDER_ATOMIC]
