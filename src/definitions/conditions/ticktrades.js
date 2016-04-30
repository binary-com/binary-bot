// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#cur8so

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
				.appendField(i18n._("Ticks:"));
			this.appendDummyInput()
				.appendField(i18n._("Payout:"))
				.appendField(new Blockly.FieldDropdown(Bot.config.lists.PAYOUTTYPE), "PAYOUTTYPE_LIST");
			this.appendDummyInput()
				.appendField(i18n._("Currency:"))
				.appendField(new Blockly.FieldDropdown(Bot.config.lists.CURRENCY), "CURRENCY_LIST");
			this.appendValueInput("AMOUNT")
				.setCheck("Number")
				.appendField(i18n._("Amount:"));
			if ( Bot.config.opposites_have_barrier.indexOf(opposites) > -1 ) {
				this.appendValueInput("PREDICTION")
					.setCheck("Number")
					.appendField(i18n._("Prediction:"));
			}
			this.setInputsInline(false);
			this.setPreviousStatement(true, "Condition");
			this.setColour(15);
			this.setTooltip(i18n._('Provides the contract conditions:') + ' ' + option_names[0] + '/' + option_names[1]);
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev){
			Bot.utils.getRelationChecker().condition(this, ev);
		},
	};
});
