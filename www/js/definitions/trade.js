Blockly.Blocks['trade'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Trade");
		this.appendValueInput("ACCOUNT")
			.setCheck("Number")
			.appendField("With Account:")
			.appendField(new Blockly.FieldDropdown(Bot.server.getAccounts), "ACCOUNT_LIST");
		this.setInputsInline(true);
		this.appendStatementInput("SUBMARKET")
			.setCheck("Submarket")
			.appendField("Submarket");
		this.setPreviousStatement(true, 'Trade');
		this.setNextStatement(true, 'Submarket');
		this.setColour(60);
		this.setTooltip('The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts.');
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	}, 
	onchange: function(ev){
		Bot.utils.unplugErrors.trade(this, ev);
	},
};
