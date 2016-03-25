Blockly.Blocks['trade'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Trade");
		this.appendValueInput("ACCOUNT")
			.setCheck("Account")
			.appendField("With Account:");
		this.appendStatementInput("SUBMARKET")
			.setCheck("Submarket")
			.appendField("Submarket");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setInputsInline(false);
		this.setColour(60);
	}
};
