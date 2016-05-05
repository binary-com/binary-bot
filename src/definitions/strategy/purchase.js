// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
var blockly = require('blockly');
var i18n = require('i18n');
var relationChecker = require('../../utils/relationChecker');
var globals = require('../../globals/globals');

blockly.Blocks.purchase = {
	init: function() {
		this.appendDummyInput()
			.appendField(i18n._("Purchase"))
			.appendField(new blockly.FieldDropdown(globals.purchase_choices), "PURCHASE_LIST");
		this.setPreviousStatement(true, 'Purchase');
		this.setColour(180);
		this.setTooltip(i18n._('Purchases a chosen contract. Accepts index to choose between the contracts.'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev) {
		relationChecker.inside_strategy(this, ev, 'Purchase');
	},
};
