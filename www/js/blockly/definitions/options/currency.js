// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#nwws36
Blockly.Blocks['currency'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown(Bot.config.lists.CURRENCY), "CURRENCY_LIST");
		this.setOutput(true, "Currency");
		this.setColour(300);
	}
};
