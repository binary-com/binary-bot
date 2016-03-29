// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo

Blockly.Blocks['purchase'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Purchase");
		this.appendValueInput("PURCHASE")
			.setCheck("Number")
			.appendField(new Blockly.FieldDropdown(Bot.server.getPurchaseChoices), "PURCHASE_LIST");
		this.setInputsInline(true);
		this.setPreviousStatement(true, 'Purchase');
		this.setColour(180);
	},
	onchange: function(ev) {
		var topParent = Bot.utils.findTopParentBlock(this);
		if ( topParent !== null && topParent.id !== 'strategy' ) {
			this.unplug();
		}
	},
};
