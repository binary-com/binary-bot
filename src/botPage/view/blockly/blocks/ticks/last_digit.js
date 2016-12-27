// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { tickScope } from '../../relationChecker'
import { translator } from '../../../../../common/translator'

Blockly.Blocks.last_digit = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Last Digit'))
    this.setOutput(true, 'Number')
    this.setColour('#f2f2f2')
    this.setTooltip(translator.translateText('Returns the last digit of the latest tick'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    tickScope(this, ev, 'Tick Value')
  },
}
Blockly.JavaScript.last_digit = () => [
  'Number(Bot.expect.tick(Bot.expect.notEmptyArray(this.ticks.ticks).slice(-1)[0]).quote.toFixed(this.ticks.pipSize).slice(-1)[0])',
  Blockly.JavaScript.ORDER_ATOMIC]
