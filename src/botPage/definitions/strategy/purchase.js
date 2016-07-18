// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
var blockly = require('blockly');
var i18n = require('i18n');
var relationChecker = require('../../utils/relationChecker');
var globals = require('../../globals/globals');

blockly.Blocks.purchase = {
	init: function() {
		this.appendDummyInput()
			.appendField(translator.translateText("Purchase"))
			.appendField(new blockly.FieldDropdown(globals.getPurchaseChoices), "PURCHASE_LIST");
		this.setPreviousStatement(true, 'Purchase');
		this.setColour("#f2f2f2");
		this.setTooltip(translator.translateText('Purchases a chosen contract. Accepts index to choose between the contracts.'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev) {
		relationChecker.inside_strategy(this, ev, 'Purchase');
	},
};
