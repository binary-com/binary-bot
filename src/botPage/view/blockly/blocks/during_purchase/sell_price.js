import { translator } from '../../../../../common/translator'
import { insideDuringPurchase } from '../../relationChecker'

Blockly.Blocks.sell_price = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Sell profit/loss'))
    this.setOutput(true, 'Number')
    this.setColour('#f2f2f2')
    this.setTooltip(translator.translateText('Returns the profit for sell at market.'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    insideDuringPurchase(this, ev, translator.translateText('Sell profit/loss'))
  },
}
Blockly.JavaScript.sell_price = () => {
  const code = '(+(Number(this.openContract.bid_price) - Number(this.openContract.buy_price)).toFixed(2))'
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
