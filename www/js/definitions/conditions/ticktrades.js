// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#s2hdag

Object.keys(Bot.config.opposites).forEach(function(opposites){
	Blockly.Blocks[opposites.toLowerCase()] = {
		init: function() {
			var option_names = [];
			Bot.config.opposites[opposites].forEach(function(options){
				
				var option_alias = Object.keys(options)[0];
				var option_name = options[option_alias];
				option_names.push(option_name);	
			});
			this.appendDummyInput()
				.appendField(option_names[0] + '/' + option_names[1]);
			this.appendValueInput("DURATION")
				.setCheck("Number")
				.appendField("Ticks:");
			this.appendValueInput("PAYOUTTYPE")
				.setCheck("PayoutType")
				.appendField("Payout Type:");
			this.appendValueInput("CURRENCY")
				.setCheck("Currency")
				.appendField("Currency:");
			this.appendValueInput("AMOUNT")
				.setCheck("Number")
				.appendField("Amount:");
			if ( Bot.config.opposites_have_barrier.indexOf(opposites) > -1 ) {
				this.appendValueInput("PREDICTION")
					.setCheck("Number")
					.appendField("Prediction:");
			}
			this.setInputsInline(false);
			this.setPreviousStatement(true, "Condition");
			this.setColour(15);
		}
	};
});
