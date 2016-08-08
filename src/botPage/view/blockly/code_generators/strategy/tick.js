'use strict';

Blockly.JavaScript.tick = function(block) {
	var code = 'ticks.ticks.slice(-1)[0].quote';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
