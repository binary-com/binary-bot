// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xkasg4

Blockly.Blocks['trade_again'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Trade Again");
		this.setPreviousStatement(true, 'TradeAgain');
		this.setColour(180);
	},
	onchange: function(ev) {
		Bot.utils.unplugErrors.trage_again(this, ev);
	},
};
