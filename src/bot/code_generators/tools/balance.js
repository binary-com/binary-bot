var blockly = require('blockly');
blockly.JavaScript.balance = function(block) {
  var balance_type = block.getFieldValue('BALANCE_TYPE');
	var code = 'Bot.trade.getBalance(\''+ balance_type +'\')';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
