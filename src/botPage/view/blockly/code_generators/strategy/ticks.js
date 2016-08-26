'use strict';

Blockly.JavaScript.ticks = function(block) {
	var code = 'ticks.ticks.map(function(i){return i.quote;})';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
