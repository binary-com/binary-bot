'use strict';
import blockly from 'blockly';
blockly.JavaScript.total_profit = function(block) {
	var code = 'Bot.trade.getTotalProfit()';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
