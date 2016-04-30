Blockly.JavaScript.check_direction = function(block) {
	var check_with = block.getFieldValue('CHECK_DIRECTION');
	var code = '(direction === \'' + check_with + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
