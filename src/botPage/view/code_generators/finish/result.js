var blockly = require('blockly');
blockly.JavaScript.contract_result = function(block) {
	var code = 'result';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
