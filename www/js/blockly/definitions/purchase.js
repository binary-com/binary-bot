// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#mvt2gn

Blockly.Blocks['purchase'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Purchase");
		this.appendValueInput("CHOICE")
			.setCheck("Number");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setColour(180);
	}
};
