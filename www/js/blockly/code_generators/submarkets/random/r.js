Bot.config.r_markets.forEach(function(market){
	Blockly.JavaScript[market] = function(block) {
		var condition = Blockly.JavaScript.statementToCode(block, 'CONDITION');
		var code = 'Bot.markets.random.' + market + '('+condition+')';
		return code;
	};
});
