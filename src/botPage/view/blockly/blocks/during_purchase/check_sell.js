// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import { translator } from '../../../../../common/translator'
import { insideDuringPurchase } from '../../relationChecker'

Blockly.Blocks.check_sell = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Sell is available'))
    this.setOutput(true, 'Boolean')
    this.setColour('#f2f2f2')
    this.setTooltip(translator.translateText('True if sell at market is available'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    insideDuringPurchase(this, ev, translator.translateText('Sell is available'))
  },
}

Blockly.JavaScript.check_sell = () => {
  const code = '(this.isSellAvailable())'
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
