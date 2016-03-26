// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo

Blockly.Blocks['purchase'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Purchase");
		this.appendValueInput("PURCHASE")
			.setCheck("Number")
			.appendField(new Blockly.FieldDropdown(Bot.server.getPurchaseChoices), "PURCHASE_LIST");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setColour(180);
	}
};
