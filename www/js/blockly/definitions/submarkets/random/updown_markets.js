// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#abpy8a

Bot.config.updown_markets.forEach(function(market, index){
	Blockly.Blocks[market] = {
		init: function() {
			this.appendDummyInput()
				.appendField(Bot.config.updown_market_names[index]);
			this.appendStatementInput("CONDITION")
				.setCheck("Condition");
			this.setInputsInline(true);
			this.setPreviousStatement(true, "Submarket");
			this.setColour(345);
		},
		onchange: function(ev){
			var condition_type = this.childBlocks_[0].type;
			Bot.server.purchase_choices = Bot.config.opposites[condition_type + '_names'];
		}
	};
});
