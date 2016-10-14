// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translator } from '../../../../../../common/translator';

Blockly.Blocks.emaa = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('Exponential Moving Average Array'));
    this.appendValueInput('INPUT')
      .setCheck('Array')
      .appendField(translator.translateText('Input List'));
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField(translator.translateText('Period'));
    this.setOutput(true, 'Array');
    this.setColour('#dedede');
    this.setTooltip(translator.translateText('Calculates Exponential Moving Average (EMA) list from a list of values with a period')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};

Blockly.JavaScript.emaa = (block) => {
  const input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
  const period = Blockly.JavaScript.valueToCode(block, 'PERIOD', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `Bot.math.indicators.exponentialMovingAverageArray(Bot.expect.notEmptyArray(${
  input}), { periods: Bot.expect.number('period', ${period}) })`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
