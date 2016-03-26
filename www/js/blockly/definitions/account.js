Blockly.Blocks['account'] = {
	init: function() {
		this.appendValueInput("ACCOUNT")
			.setCheck("Number")
			.appendField(new Blockly.FieldDropdown(Bot.server.getAccounts), "ACCOUNT_LIST");
		this.setInputsInline(true);
		this.setOutput(true, "Account");
		this.setColour(270);
	}
};
