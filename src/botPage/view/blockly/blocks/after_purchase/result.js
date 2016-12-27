// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e54skh
import { translator } from '../../../../../common/translator'
import { insideAfterPurchase } from '../../relationChecker'

Blockly.Blocks.contract_result = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Contract Result'))
    this.setOutput(true, 'String')
    this.setColour('#f2f2f2')
    this.setTooltip(translator.translateText('Returns the result of the finished contract'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    insideAfterPurchase(this, ev, 'Contract Result')
  },
}

Blockly.JavaScript.contract_result = () => ['this.contractDetails[10]', Blockly.JavaScript.ORDER_ATOMIC]
