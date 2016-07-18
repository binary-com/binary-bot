// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xkasg4
var blockly = require('blockly');
var i18n = require('i18n');
var relationChecker = require('../../relationChecker');

blockly.Blocks.trade_again = {
	init: function() {
		this.appendDummyInput()
			.appendField(translator.translateText("Trade Again"));
		this.setPreviousStatement(true, 'TradeAgain');
		this.setColour("#f2f2f2");
		this.setTooltip(translator.translateText('Runs the trade block again'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev) {
		relationChecker.inside_finish(this, ev, 'Trade Again');
	},
};
