var blockly = require('blockly');
blockly.JavaScript.tick = function(block) {
	var code = 'tick';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
