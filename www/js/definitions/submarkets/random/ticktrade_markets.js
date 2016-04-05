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
			this.setTooltip('Chooses the market ' + Bot.config.ticktrade_market_names[index] + ' for the trade block');
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev){
			Bot.utils.getRelationChecker().submarket(this, ev);
		}
	};
});
