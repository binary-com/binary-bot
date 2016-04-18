Blockly.JavaScript['trade'] = function(block) {
	var account = block.getFieldValue('ACCOUNT_LIST');
	var submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
	if ( submarket === '' ) {
		throw {message: 'You have to add a submarket first'};
	}
	// TODO: Assemble JavaScript into code variable.
	var code = 'var trade = function(trade_again){\nBot.server.trade(\''+account.trim()+'\', '+submarket.trim()+', trade_again);\n};\ntrade();\n';
	return code;
};
