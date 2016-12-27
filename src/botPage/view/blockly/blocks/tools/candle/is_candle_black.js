// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import { translator } from '../../../../../../common/translator'

Blockly.Blocks.is_candle_black = {
  init: function init() {
    this.appendValueInput('OHLCOBJ')
      .setCheck('Candle')
      .appendField(translator.translateText('is candle black?'))
    this.setInputsInline(false)
    this.setOutput(true, 'Boolean')
    this.setColour('#dedede')
    this.setTooltip(translator.translateText('Checks if the given candle is black, returns true if close is less than open in the given candle.'))
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
  },
}

Blockly.JavaScript.is_candle_black = (block) => {
  const ohlcObj = Blockly.JavaScript.valueToCode(block,
      'OHLCOBJ', Blockly.JavaScript.ORDER_ATOMIC) || 'null'
  const code = `(function () {return this.close < this.open}).call(Bot.expect.ohlc(${ohlcObj}))`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
