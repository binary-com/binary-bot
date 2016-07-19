var blockly = require('blockly');
var i18n = require('i18n');
var relationChecker = require('../../relationChecker');
blockly.Blocks.trade = {
	init: function () {
		this.appendDummyInput()
	        .appendField(translator.translateText("Step 1: Define Trade"));
	    this.appendStatementInput("SUBMARKET")
	        .setCheck('Submarket');
		this.setPreviousStatement(true, null);
		this.setColour('#2a3052');
		this.setTooltip(translator.translateText('The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts.'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function (ev) {
		relationChecker.trade(this, ev);
	},
};
