Blockly.JavaScript['trade'] = function(block) {
	var account = block.getFieldValue('ACCOUNT_LIST');
	var submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
	if ( submarket === '' ) {
		throw {message: 'You have to add a submarket first'};
	}
	// TODO: Assemble JavaScript into code variable.
	var code = 'var trade = function(){\nBot.server.init(\''+account.trim()+'\', '+submarket.trim()+', decide_when_to_purchase_with_each_tick, decide_what_to_do_after_the_contract_is_finished);\n};\ntrade();\n';
	return code;
};
