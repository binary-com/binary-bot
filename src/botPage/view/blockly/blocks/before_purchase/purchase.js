// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
import { getPurchaseChoices } from '../../../blockly/utils'
import { insideBeforePurchase } from '../../relationChecker'
import { translator } from '../../../../../common/translator'

Blockly.Blocks.purchase = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Purchase'))
      .appendField(new Blockly.FieldDropdown(getPurchaseChoices), 'PURCHASE_LIST')
    this.setPreviousStatement(true, 'Purchase')
    this.setColour('#f2f2f2')
    this.setTooltip(translator.translateText('Purchases a chosen contract.'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    insideBeforePurchase(this, ev, 'Purchase')
  },
}
Blockly.JavaScript.purchase = (block) => {
  const purchaseList = block.getFieldValue('PURCHASE_LIST')
  const code = `this.purchase('${purchaseList}');
`
  return code
}
