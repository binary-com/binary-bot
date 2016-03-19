// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#abpy8a
Blockly.Blocks['r_100'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("R_100");
		this.appendStatementInput("CONDITION")
			.setCheck("Condition");
		this.setInputsInline(true);
		this.setPreviousStatement(true, "Submarket");
		this.setColour(345);
	}
};
