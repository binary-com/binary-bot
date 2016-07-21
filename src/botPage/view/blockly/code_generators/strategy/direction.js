'use strict';
import blockly from 'blockly';
blockly.JavaScript.direction = function(block) {
	var code = 'direction';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
