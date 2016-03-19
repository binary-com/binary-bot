Blockly.JavaScript['r_100'] = function(block) {
	var condition = Blockly.JavaScript.statementToCode(block, 'CONDITION');
	var code = 'Bot.markets.random.r_100('+condition+')';
	return code;
};
