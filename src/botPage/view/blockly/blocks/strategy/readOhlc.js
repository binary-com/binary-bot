// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import config from '../../../../../common/const';
import { translator } from '../../../../../common/translator';
import { insideStrategy } from '../../relationChecker';

Blockly.Blocks.read_ohlc = {
  init: function init() {
    this.appendValueInput('CANDLEINDEX')
      .setCheck('Number')
      .appendField(translator.translateText('Read'))
      .appendField(new Blockly.FieldDropdown(config.ohlcFields), 'OHLCFIELD_LIST')
      .appendField(`# ${translator.translateText('latest')}`);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Read a field from a candle selected by index from the last candle, 1 as the latest and 2 as the candle before that.')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    insideStrategy(this, ev, 'Candle');
  },
};

Blockly.JavaScript.read_ohlc = (block) => {
  const ohlcField = block.getFieldValue('OHLCFIELD_LIST');
  let index = Number(Blockly.JavaScript.valueToCode(block,
    'CANDLEINDEX', Blockly.JavaScript.ORDER_ATOMIC));
  let code;
  if (isNaN(index) || index < 1) {
    index = 1;
  }
  if (index === 1) {
    code = `(Bot.expectNonEmptyArray(ticks.ohlc.slice(-1)[0]).${ohlcField})`;
  } else {
    code = `(Bot.expectNonEmptyArray(ticks.ohlc.slice(-1*${
    index}, -1*${index - 1})[0]).${ohlcField})`;
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
