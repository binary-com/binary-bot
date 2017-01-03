// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import { translate } from '../../../../../common/i18n'
import { tickScope } from '../../relationChecker'

Blockly.Blocks.get_ohlc = {
  init: function init() {
    this.appendValueInput('CANDLEINDEX')
      .setCheck('Number')
      .appendField(translate('in candle list'))
      .appendField(`${translate('get # from end')}`)
    this.setOutput(true, 'Candle')
    this.setInputsInline(true)
    this.setColour('#f2f2f2')
    this.setTooltip(translate('Get the nth recent candle'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    tickScope(this, ev, 'Get Candle')
  },
}

Blockly.JavaScript.get_ohlc = (block) => {
  let index = Number(Blockly.JavaScript.valueToCode(block,
      'CANDLEINDEX', Blockly.JavaScript.ORDER_ATOMIC)) || '0'
  let code
  if (isNaN(index) || index < 1) {
    index = 1
  }
  if (index === 1) {
    code = 'Bot.expect.ohlc(Bot.expect.notEmptyArray(this.ticks.ohlc).slice(-1)[0])'
  } else {
    code = `Bot.expect.ohlc(Bot.expect.notEmptyArray(this.ticks.ohlc).slice(-1*${
    index}, -1*${index - 1})[0])`
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
