// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e54skh
import { translate } from '../../../../../common/i18n'
import { insideAfterPurchase } from '../../relationChecker'

Blockly.Blocks.contract_result = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translate('Contract Result'))
    this.setOutput(true, 'String')
    this.setColour('#f2f2f2')
    this.setTooltip(translate('Returns the result of the finished contract'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    insideAfterPurchase(this, ev, 'Contract Result')
  },
}

Blockly.JavaScript.contract_result = () => ['this.contractDetails[10]', Blockly.JavaScript.ORDER_ATOMIC]
