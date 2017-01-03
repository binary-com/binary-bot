// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xq4ajc
import { insideAfterPurchase } from '../../relationChecker'
import { translate } from '../../../../../common/i18n'

Blockly.Blocks.contract_details = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translate('Contract Details'))
    this.setOutput(true, 'Array')
    this.setColour('#f2f2f2')
    this.setTooltip(translate('Returns the list of details for the finished contract'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    insideAfterPurchase(this, ev, 'Contract Details')
  },
}
Blockly.JavaScript.contract_details = () => ['this.contractDetails', Blockly.JavaScript.ORDER_ATOMIC]
