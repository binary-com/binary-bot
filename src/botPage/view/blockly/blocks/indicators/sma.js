// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import { translator } from '../../../../../common/translator';
import { insideStrategy } from '../../relationChecker';

Blockly.Blocks.sma = {
	init: function init() {
		this.appendDummyInput()
			.appendField(translator.translateText('Simple Moving Average'));
		this.appendValueInput('INPUT')
			.setCheck('Array')
			.appendField('Input List');
		this.appendValueInput('PERIOD')
			.setCheck('Number')
			.appendField('Period');
		this.setOutput(true, 'Number');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Calculates Simple Moving Average (SMA) from a list with a period')); // eslint-disable-line max-len
		this.setHelpUrl('http://www.example.com/');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
};

Blockly.JavaScript.sma = function(block) {
  var value_input = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
  var value_period = Blockly.JavaScript.valueToCode(block, 'PERIOD', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
