// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#abpy8a

Bot.config.r_markets.forEach(function(market){
	Blockly.Blocks[market] = {
		init: function() {
			this.appendDummyInput()
				.appendField(market.toUpperCase());
			this.appendStatementInput("CONDITION")
				.setCheck("Condition");
			this.setInputsInline(true);
			this.setPreviousStatement(true, "Submarket");
			this.setColour(345);
		}
	};
});
