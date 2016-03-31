// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo

Blockly.Blocks['purchase'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Purchase")
			.appendField(new Blockly.FieldDropdown(Bot.server.getPurchaseChoices), "PURCHASE_LIST");
		this.setPreviousStatement(true, 'Purchase');
		this.setColour(180);
		this.setTooltip('Purchases a chosen contract. Accepts index to choose between the contracts.');
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev) {
		Bot.utils.unplugErrors.purchase(this, ev);
	},
};
