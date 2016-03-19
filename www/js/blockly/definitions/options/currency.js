// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e66rpm
Blockly.Blocks['currency'] = {
	init: function() {
		this.appendValueInput("CURRENCY")
			.setCheck("Number")
			.appendField(new Blockly.FieldDropdown(Bot.config.lists.CURRENCY), "CURRENCY_LIST");
		this.setInputsInline(true);
		this.setOutput(true, "Currency");
		this.setColour(300);
	}
};
