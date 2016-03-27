// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#abpy8a

Bot.config.ticktrade_markets.forEach(function(market, index){
	Blockly.Blocks[market] = {
		init: function() {
			this.appendDummyInput()
				.appendField(Bot.config.ticktrade_market_names[index]);
			this.appendStatementInput("CONDITION")
				.setCheck("Condition");
			this.setInputsInline(true);
			this.setPreviousStatement(true, "Submarket");
			this.setColour(345);
		},
		onchange: function(ev){
			if ( this.hasOwnProperty('childBlocks_') && this.childBlocks_.length > 0 ) {
				var condition_type = this.childBlocks_[0].type;
				var opposites = Bot.config.opposites[condition_type.toUpperCase()];
				Bot.server.purchase_choices = [];
				opposites.forEach(function(option, index){
					Bot.server.purchase_choices.push([option[Object.keys(option)[0]], (index + 1).toString()]);
				});
			}
		}
	};
});
