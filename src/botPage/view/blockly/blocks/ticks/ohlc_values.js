// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335
import config from '../../../../../common/const'
import { tickScope } from '../../relationChecker'
import { translate } from '../../../../../common/i18n'

Blockly.Blocks.ohlc_values = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translate('Candle Values'))
      .appendField(new Blockly.FieldDropdown(config.ohlcFields), 'OHLCFIELD_LIST')
    this.setOutput(true, 'Array')
    this.setColour('#f2f2f2')
    this.setTooltip(translate('Returns a list of the selected candle values'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
  onchange: function onchange(ev) {
    tickScope(this, ev, 'Candles List')
  },
}

Blockly.JavaScript.ohlc_values = (block) => {
  const ohlcField = block.getFieldValue('OHLCFIELD_LIST')
  const code = `(Bot.expect.notEmptyArray(this.ticks.ohlc).map(function(e){return Bot.expect.ohlc(e).${
  ohlcField}}))`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
