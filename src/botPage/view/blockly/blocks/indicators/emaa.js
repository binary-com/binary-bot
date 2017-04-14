// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translate } from '../../../../../common/i18n';

Blockly.Blocks.emaa = {
  init: function init() {
    this.appendDummyInput().appendField(
      translate('Exponential Moving Average Array'),
    );
    this.appendValueInput('INPUT')
      .setCheck('Array')
      .appendField(translate('Input List'));
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField(translate('Period'));
    this.setOutput(true, 'Array');
    this.setColour('#dedede');
    this.setTooltip(
      translate(
        'Calculates Exponential Moving Average (EMA) list from a list of values with a period',
      ),
    );
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};

Blockly.JavaScript.emaa = block => {
  const input =
    Blockly.JavaScript.valueToCode(
      block,
      'INPUT',
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || '[]';
  const period =
    Blockly.JavaScript.valueToCode(
      block,
      'PERIOD',
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || '10';
  return [`Bot.emaa(${input}, ${period})`, Blockly.JavaScript.ORDER_NONE];
};
