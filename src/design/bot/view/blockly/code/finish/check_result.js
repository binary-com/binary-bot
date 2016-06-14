var blockly = require('blockly');
blockly.JavaScript.contract_check_result = function(block) {
	var check_with = block.getFieldValue('CHECK_RESULT');
	var code = '(result === \'' + check_with + '\')';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
