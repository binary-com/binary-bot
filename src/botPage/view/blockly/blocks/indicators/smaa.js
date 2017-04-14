// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translate } from '../../../../../common/i18n';

Blockly.Blocks.smaa = {
  init: function init() {
    this.appendDummyInput().appendField(
      translate('Simple Moving Average Array'),
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
        'Calculates Simple Moving Average (SMA) list from a list of values with a period',
      ),
    );
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};

Blockly.JavaScript.smaa = block => {
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
  return [`Bot.smaa(${input}, ${period})`, Blockly.JavaScript.ORDER_NONE];
};
