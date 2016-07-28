'use strict';

Blockly.JavaScript.check_direction = function(block) {
	var check_with = block.getFieldValue('CHECK_DIRECTION');
	var code = '(ticks.direction === \'' + check_with + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
