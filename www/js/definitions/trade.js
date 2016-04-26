Blockly.Blocks['trade'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Trade With Account:")
			.appendField(new Blockly.FieldDropdown(Bot.server.getAccounts), "ACCOUNT_LIST");
		this.appendStatementInput("SUBMARKET")
			.setCheck("Submarket")
			.appendField("Submarket");
		this.setPreviousStatement(true, null);
		this.setColour(60);
		this.setTooltip('The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts.');
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	}, 
	onchange: function(ev){
		Bot.utils.getRelationChecker().trade(this, ev);
	},
};
