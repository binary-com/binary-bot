// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kqvz7z
import { translator } from '../../../../../common/translator'
import config from '../../../../../common/const'

Blockly.Blocks.balance = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Balance:'))
      .appendField(new Blockly.FieldDropdown(config.lists.BALANCE_TYPE), 'BALANCE_TYPE')
    this.setOutput(true, null)
    this.setColour('#dedede')
    this.setTooltip(translator.translateText('Get balance number or string'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}
Blockly.JavaScript.balance = (block) => {
  const balanceType = block.getFieldValue('BALANCE_TYPE')
  const code = `Bot.getBalance('${balanceType}')`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
