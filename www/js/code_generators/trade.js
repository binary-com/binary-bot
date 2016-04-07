Blockly.JavaScript['trade'] = function(block) {
	var account = block.getFieldValue('ACCOUNT_LIST');
	var submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
	if ( submarket === '' ) {
		throw {message: 'You have to add a submarket first'};
	}
	// TODO: Assemble JavaScript into code variable.
	var code = 'var trade = function(){\nBot.server.init(\''+account.trim()+'\', '+submarket.trim()+', strategy, finish);\n};\ntrade();\n';
	return code;
};
