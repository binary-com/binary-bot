Blockly.Blocks['login'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Login");
		this.appendValueInput("ACCOUNT")
			.setCheck("Account")
			.appendField("Account:");
		this.appendStatementInput("SUBMARKET")
			.setCheck("Submarket")
			.appendField("Submarket");
		this.setInputsInline(false);
		this.setColour(60);
	}
};
