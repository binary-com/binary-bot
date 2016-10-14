// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import { translator } from '../../../../../common/translator';

Blockly.Blocks.is_candle_black = {
  init: function init() {
    this.appendValueInput('OHLCOBJ')
      .setCheck('Candle')
      .appendField(translator.translateText('is candle black?'));
    this.setInputsInline(false);
    this.setOutput(true, 'Boolean');
    this.setColour('#dedede');
    this.setTooltip(translator.translateText('Checks if the given candle is black, returns true if close is less than open in the given candle.')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};

Blockly.JavaScript.is_candle_black = (block) => {
  const ohlcObj = Blockly.JavaScript.valueToCode(block, 'OHLCOBJ', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (ohlcObj) {
    code = `(function () {return this.close < this.open}).call(Bot.expect.ohlc((${
    ohlcObj} instanceof Array)? Bot.expect.notEmptyArray(${
    ohlcObj}).slice(-1)[0] : ${ohlcObj}))`;
  } else {
    code = '(function () {return this.close < this.open}).call('
    + 'Bot.expect.ohlc(Bot.expect.notEmptyArray(ticks.ohlc).slice(-1)[0]))';
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
