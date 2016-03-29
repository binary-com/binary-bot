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
			if ( this.childBlocks_.length > 0 && Bot.config.conditions.indexOf(this.childBlocks_[0].type) < 0 ) {
				Array.prototype.slice.apply(this.childBlocks_).forEach(function(child){
					child.unplug();
				});
			}
			if ( this.parentBlock_ !== null) {
				if ( this.parentBlock_.type !== 'trade' ) {
					this.unplug();
				} else {
					if ( ev.hasOwnProperty('newInputName') && ( ev.newInputName === 'CONDITION' || ev.newInputName === 'SUBMARKET') ) {
						Bot.utils.addPurchaseOptions();
					}
				}
			}
		}
	};
});
