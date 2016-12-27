// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
import { getPurchaseChoices } from '../../../blockly/utils'
import { insideBeforePurchase } from '../../relationChecker'
import { translator } from '../../../../../common/translator'

Blockly.Blocks.payout = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Payout'))
      .appendField(new Blockly.FieldDropdown(() => getPurchaseChoices()), 'PURCHASE_LIST')
    this.setOutput(true, 'Number')
    this.setColour('#f2f2f2')
    this.setTooltip(translator.translateText('Payout for selected proposal'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    insideBeforePurchase(this, ev, 'Payout')
  },
}
Blockly.JavaScript.payout = (block) => {
  const purchaseList = block.getFieldValue('PURCHASE_LIST')
  const code = `Number(this.getContract('${purchaseList}').payout)`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
