// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import config from '../../../../../common/const';
import { translator } from '../../../../../common/translator';

Blockly.Blocks.read_ohlc_obj = {
  init: function init() {
    this.appendValueInput('OHLCOBJ')
      .setCheck('Candle')
      .appendField(translator.translateText('Read'))
      .appendField(new Blockly.FieldDropdown(config.ohlcFields), 'OHLCFIELD_LIST')
      .appendField(translator.translateText('in candle'));
    this.setInputsInline(false);
    this.setOutput(true, 'Number');
    this.setColour('#dedede');
    this.setTooltip(translator.translateText('Read a field in a candle (read from the Candles list)')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};

Blockly.JavaScript.read_ohlc_obj = (block) => {
  const ohlcField = block.getFieldValue('OHLCFIELD_LIST');
  const ohlcObj = Blockly.JavaScript.valueToCode(block, 'OHLCOBJ', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `Bot.expect.ohlc((${ohlcObj} instanceof Array)? Bot.expect.notEmptyArray(${
  ohlcObj}).slice(-1)[0] : ${ohlcObj}).${ohlcField}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
