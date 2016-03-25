// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#dj932r
Blockly.Blocks['durationunit'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown(Bot.config.lists.DURATIONUNIT), "DURATIONUNIT_LIST");
		this.setInputsInline(true);
		this.setOutput(true, "DurationUnit");
		this.setColour(300);
	}
};
