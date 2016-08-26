'use strict';
Blockly.JavaScript.read_tick_obj = function(block) {
	var tickField = block.getFieldValue('TICKFIELD_LIST');
	var tickObj = Blockly.JavaScript.valueToCode(block, 'TICKOBJ', Blockly.JavaScript.ORDER_ATOMIC);
	var code = tickObj + '.' + tickField;
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
