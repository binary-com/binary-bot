// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ojhmbr
Blockly.Blocks['payouttype'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown(Bot.config.lists.PAYOUTTYPE), "PAYOUTTYPE_LIST");
		this.setInputsInline(true);
		this.setOutput(true, "PayoutType");
		this.setColour(300);
	}
};
