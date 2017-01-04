// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n3drko
import { translate } from '../../../../../common/i18n'
import { tickScope } from '../../relationChecker'

Blockly.Blocks.direction = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translate('Tick Direction'))
    this.setOutput(true, 'String')
    this.setColour('#f2f2f2')
    this.setTooltip(translate("Returns the tick direction received by a before purchase block, its value could be 'up' if the tick is more than before, 'down' if less than before and empty ('') if the tick is equal to the previous tick"))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    tickScope(this, ev, 'Tick Direction')
  },
}

Blockly.JavaScript.direction = () => ['this.ticks.direction', Blockly.JavaScript.ORDER_ATOMIC]
