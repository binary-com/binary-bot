// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog
import config from '../../../../../common/const';
import { translator } from '../../../../../common/translator';
import { insideBeforePurchase } from '../../relationChecker';

Blockly.Blocks.candle_type = {
  init: function init() {
    this.appendValueInput('CANDLEINDEX')
      .setCheck('Number')
      .appendField(translator.translateText('Read'))
      .appendField(new Blockly.FieldDropdown(config.ohlcFields), 'OHLCFIELD_LIST')
      .appendField(`${translator.translateText('in')}`);
    this.appendDummyInput()
      .appendField(`${translator.translateText('recent candle')}`);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Read the selected candle value in the nth recent candle')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function onchange(ev) {
    insideBeforePurchase(this, ev, 'Candle');
  },
};

Blockly.JavaScript.candle_type = (block) => {
  const ohlcField = block.getFieldValue('OHLCFIELD_LIST');
  let index = Number(Blockly.JavaScript.valueToCode(block,
    'CANDLEINDEX', Blockly.JavaScript.ORDER_ATOMIC));
  let code;
  if (isNaN(index) || index < 1) {
    index = 1;
  }
  if (index === 1) {
    code = `(Bot.expect.ohlc(Bot.expect.notEmptyArray(ticks.ohlc).slice(-1)[0]).${ohlcField})`;
  } else {
    code = `(Bot.expect.ohlc(Bot.expect.notEmptyArray(ticks.ohlc).slice(-1*${
    index}, -1*${index - 1})[0]).${ohlcField})`;
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
