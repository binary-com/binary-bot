'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#t4xqnz

import config from 'const';
import Bot from '../../../../bot';
import RelationChecker from '../../relationChecker';
import Translator from 'translator';

module.exports = function init(){
	var bot = new Bot();
	var translator = new Translator();
	Object.keys(config.opposites).forEach(function(opposites){
		Blockly.Blocks[opposites.toLowerCase()] = {
			init: function() {
				var option_names = [];
				config.opposites[opposites].forEach(function(options){
					var option_alias = Object.keys(options)[0];
					var option_name = options[option_alias];
					option_names.push(option_name);	
				});
				this.appendDummyInput()
					.setAlign(Blockly.ALIGN_CENTRE)
					.appendField(bot.symbol.getCategoryNameForCondition(opposites));
				this.appendDummyInput()
					.appendField('> ' + option_names[0] + '/' + option_names[1]);
				this.appendValueInput("DURATION")
					.setCheck("Number")
					.appendField(translator.translateText("Duration:"));
				this.appendDummyInput()
					.appendField("Duration Type:")
					.appendField(new Blockly.FieldDropdown(config.supportedDurationTypes[opposites]), "DURATIONTYPE_LIST");
				this.appendDummyInput()
					.appendField(translator.translateText("Payout:"))
					.appendField(new Blockly.FieldDropdown(config.lists.PAYOUTTYPE), "PAYOUTTYPE_LIST");
				this.appendDummyInput()
					.appendField(translator.translateText("Currency:"))
					.appendField(new Blockly.FieldDropdown(config.lists.CURRENCY), "CURRENCY_LIST");
				this.appendValueInput("AMOUNT")
					.setCheck("Number")
					.appendField(translator.translateText("Amount:"));
				if ( config.oppositesHaveBarrier.indexOf(opposites) > -1 ) {
					this.appendValueInput("PREDICTION")
						.setCheck("Number")
						.appendField(translator.translateText("Prediction:"));
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true, "Condition");
				this.setColour("#f2f2f2");
				this.setTooltip(translator.translateText('Provides the trade types:') + ' ' + option_names[0] + '/' + option_names[1]);
				this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
			},
			onchange: function(ev){
				var relationChecker = new RelationChecker();
				relationChecker.condition(this, ev);
			},
		};
	});
};
