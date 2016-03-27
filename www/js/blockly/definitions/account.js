Blockly.Blocks['account'] = {
	init: function() {
		Bot.ui.account_dropdown = new Blockly.FieldDropdown(Bot.server.getAccounts);
		this.appendValueInput("ACCOUNT")
			.setCheck("Number")
			.appendField(Bot.ui.account_dropdown, "ACCOUNT_LIST");
		this.setInputsInline(true);
		this.setOutput(true, "Account");
		this.setColour(270);
	}
};
