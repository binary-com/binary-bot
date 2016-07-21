'use strict';
import blockly from 'blockly';
blockly.JavaScript.contract_result = function(block) {
	var code = 'result';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
