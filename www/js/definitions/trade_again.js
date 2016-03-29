// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xkasg4

Blockly.Blocks['trade_again'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Trade Again");
		this.setPreviousStatement(true, 'TradeAgain');
		this.setColour(180);
	},
	onchange: function(ev) {
		var topParent = Bot.utils.findTopParentBlock(this);
		if ( topParent !== null && topParent.id !== 'finish' ) {
			this.unplug();
		}
	},
};
