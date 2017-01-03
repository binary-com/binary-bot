// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import config from '../../../../../common/const'
import { translate } from '../../../../../common/i18n'
import { tickScope } from '../../relationChecker'

Blockly.Blocks.candle_type = {
  init: function init() {
    this.appendValueInput('CANDLEINDEX')
      .setCheck('Number')
      .appendField(translate('Read'))
      .appendField(new Blockly.FieldDropdown(config.ohlcFields), 'OHLCFIELD_LIST')
      .appendField(`${translate('in')}`)
    this.appendDummyInput()
      .appendField(`${translate('recent candle')}`)
    this.setOutput(true, 'Number')
    this.setInputsInline(true)
    this.setColour('#f2f2f2')
    this.setTooltip(translate('Read the selected candle value in the nth recent candle'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    tickScope(this, ev, 'Candle')
  },
}

Blockly.JavaScript.candle_type = (block) => {
  const ohlcField = block.getFieldValue('OHLCFIELD_LIST')
  let index = Number(Blockly.JavaScript.valueToCode(block,
      'CANDLEINDEX', Blockly.JavaScript.ORDER_ATOMIC)) || '0'
  let code
  if (isNaN(index) || index < 1) {
    index = 1
  }
  if (index === 1) {
    code = `(Bot.expect.ohlc(Bot.expect.notEmptyArray(this.ticks.ohlc).slice(-1)[0]).${ohlcField})`
  } else {
    code = `(Bot.expect.ohlc(Bot.expect.notEmptyArray(this.ticks.ohlc).slice(-1*${
    index}, -1*${index - 1})[0]).${ohlcField})`
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
