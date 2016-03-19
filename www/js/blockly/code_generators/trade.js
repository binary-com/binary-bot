Blockly.JavaScript['login'] = function(block) {
	var account = Blockly.JavaScript.valueToCode(block, 'ACCOUNT', Blockly.JavaScript.ORDER_ATOMIC);
	var submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
	// TODO: Assemble JavaScript into code variable.
	var code = 'Bot.login('+account+', '+submarket+');\n';
	return code;
};
