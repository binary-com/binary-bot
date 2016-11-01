// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4
import { translator } from '../../../../../common/translator'

Blockly.Blocks.time = {
  init: function init() {
    this.appendDummyInput()
        .appendField(translator.translateText('Seconds since epoch'))
    this.setOutput(true, 'Number')
    this.setColour('#dedede')
    this.setTooltip(translator.translateText('Returns the epoch time (seconds since epoch)')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}
Blockly.JavaScript.time = () => [
  '(parseInt((new Date().getTime())/1000))', Blockly.JavaScript.ORDER_ATOMIC]
