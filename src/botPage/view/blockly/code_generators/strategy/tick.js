'use strict';
import blockly from 'blockly';
blockly.JavaScript.tick = function(block) {
	var code = 'tick';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
