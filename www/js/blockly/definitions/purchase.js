// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo

Blockly.Blocks['purchase'] = {
	init: function() {
		Bot.ui.purchase_dropdown = new Blockly.FieldDropdown(Bot.server.getPurchaseChoices);
		this.appendDummyInput()
			.appendField("Purchase");
		this.appendValueInput("PURCHASE")
			.setCheck("Number")
			.appendField(Bot.ui.purchase_dropdown, "PURCHASE_LIST");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setColour(180);
	}
};
