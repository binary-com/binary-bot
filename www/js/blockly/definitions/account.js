Blockly.Blocks['account'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("login as");
		this.appendValueInput("ACCOUNT")
			.setCheck("Number")
			.appendField(new Blockly.FieldDropdown(Bot.config.lists.ACCOUNT), "ACCOUNT_LIST");
		this.setInputsInline(true);
		this.setOutput(true, "Account");
		this.setColour(270);
	}
};
