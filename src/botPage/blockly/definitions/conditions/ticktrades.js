// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zuc7w9
var blockly = require('blockly');
var i18n = require('i18n');
var config = require('const');
var Bot = require('../../../bot');
var relationChecker = require('../../relationChecker');
var bot = new Bot();

Object.keys(config.opposites).forEach(function(opposites){
	blockly.Blocks[opposites.toLowerCase()] = {
		init: function() {
			var option_names = [];
			config.opposites[opposites].forEach(function(options){
				var option_alias = Object.keys(options)[0];
				var option_name = options[option_alias];
				option_names.push(option_name);	
			});
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_CENTRE)
				.appendField(bot.symbol.getCategoryName(opposites));
			this.appendDummyInput()
				.appendField('> ' + option_names[0] + '/' + option_names[1]);
			this.appendValueInput("DURATION")
				.setCheck("Number")
				.appendField(translator.translateText("Ticks:"));
			this.appendDummyInput()
				.appendField(translator.translateText("Payout:"))
				.appendField(new blockly.FieldDropdown(config.lists.PAYOUTTYPE), "PAYOUTTYPE_LIST");
			this.appendDummyInput()
				.appendField(translator.translateText("Currency:"))
				.appendField(new blockly.FieldDropdown(config.lists.CURRENCY), "CURRENCY_LIST");
			this.appendValueInput("AMOUNT")
				.setCheck("Number")
				.appendField(translator.translateText("Amount:"));
			if ( config.opposites_have_barrier.indexOf(opposites) > -1 ) {
				this.appendValueInput("PREDICTION")
					.setCheck("Number")
					.appendField(translator.translateText("Prediction:"));
			}
			this.setInputsInline(false);
			this.setPreviousStatement(true, "Condition");
			this.setColour("#f2f2f2");
			this.setTooltip(translator.translateText('Provides the contract conditions:') + ' ' + option_names[0] + '/' + option_names[1]);
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev){
			relationChecker.condition(this, ev);
		},
	};
});
