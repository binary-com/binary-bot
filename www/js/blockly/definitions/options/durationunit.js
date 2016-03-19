// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#mps5ta
Blockly.Blocks['durationunit'] = {
	init: function() {
		this.appendValueInput("DURATIONUNIT")
			.setCheck("Number")
			.appendField(new Blockly.FieldDropdown(Bot.config.lists.DURATIONUNIT), "DURATIONUNIT_LIST");
		this.setInputsInline(true);
		this.setOutput(true, "DurationUnit");
		this.setColour(300);
	}
};
