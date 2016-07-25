'use strict';

Blockly.JavaScript.contract_check_result = function(block) {
	var check_with = block.getFieldValue('CHECK_RESULT');
	var code = '(details[10] === \'' + check_with + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
