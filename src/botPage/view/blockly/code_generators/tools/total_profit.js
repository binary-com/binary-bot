'use strict';

Blockly.JavaScript.total_profit = function(block) {
	var code = 'Bot.trade.getTotalProfit()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
