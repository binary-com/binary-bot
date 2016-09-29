// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import config from '../../../../../common/const';
import { translator } from '../../../../../common/translator';
import { insideStrategy } from '../../relationChecker';

Blockly.Blocks.read_ohlc_obj = {
  init: function init() {
    this.appendValueInput('OHLCOBJ')
      .setCheck(null)
      .appendField(translator.translateText('Read'))
      .appendField(new Blockly.FieldDropdown(config.ohlcFields), 'OHLCFIELD_LIST')
      .appendField(translator.translateText('from Candle'));
    this.setInputsInline(false);
    this.setOutput(true, 'Number');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Read a field from a candle (received from Candles list)')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    insideStrategy(this, ev, 'Candles');
  },
};

Blockly.JavaScript.read_ohlc_obj = (block) => {
  const ohlcField = block.getFieldValue('OHLCFIELD_LIST');
  const ohlcObj = Blockly.JavaScript.valueToCode(block, 'OHLCOBJ', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (ohlcObj) {
    code = `Bot.expectOhlc((${ohlcObj} instanceof Array)? Bot.expectNonEmptyArray(${
    ohlcObj}).slice(-1)[0] : ${ohlcObj}).${ohlcField}`;
  } else {
    code = `Bot.expectOhlc(Bot.expectNonEmptyArray(ticks.ohlc).slice(-1)[0]).${ohlcField}`;
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
