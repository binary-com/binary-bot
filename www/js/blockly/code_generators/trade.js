Blockly.JavaScript['trade'] = function(block) {
	var account = Blockly.JavaScript.valueToCode(block, 'ACCOUNT', Blockly.JavaScript.ORDER_ATOMIC);
	var submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
	// TODO: Assemble JavaScript into code variable.
	var code = 'Bot.server.init('+account+', '+submarket+', decide_when_to_purchase_with_each_tick, decide_what_to_do_after_the_contract_is_finished);\n';
	return code;
};
