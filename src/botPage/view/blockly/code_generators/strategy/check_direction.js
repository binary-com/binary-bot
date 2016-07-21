'use strict';
import blockly from 'blockly';
blockly.JavaScript.check_direction = function(block) {
	var check_with = block.getFieldValue('CHECK_DIRECTION');
	var code = '(direction === \'' + check_with + '\')';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
