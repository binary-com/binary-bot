var blockly = require('blockly');
var i18n = require('i18n');
var relationChecker = require('../../utils/relationChecker');
var globals = require('../../globals/globals');
blockly.Blocks.trade = {
	init: function () {
		this.appendDummyInput()
			.appendField(i18n._("Trade With Account:"))
			.appendField(new blockly.FieldDropdown(globals.accounts), "ACCOUNT_LIST");
		this.appendStatementInput("SUBMARKET")
			.setCheck("Submarket")
			.appendField(i18n._("Submarket"));
		this.setPreviousStatement(true, null);
		this.setColour(60);
		this.setTooltip(i18n._('The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts.'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function (ev) {
		relationChecker.trade(this, ev);
	},
};
