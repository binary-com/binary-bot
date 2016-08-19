'use strict';
import config from 'const';
import Translator from 'translator';
import Bot from '../../../../bot';
var translator = new Translator();

function title(block, opposites, option_names) {
	var bot = new Bot();
	block.appendDummyInput()
		.setAlign(Blockly.ALIGN_CENTRE)
		.appendField(bot.symbol.getCategoryNameForCondition(opposites));
	block.appendDummyInput()
		.appendField('> ' + option_names[0] + '/' + option_names[1]);
}

function duration(block, opposites){
	block.appendValueInput("DURATION")
		.setCheck("Number")
		.appendField("Duration:")
		.appendField(new Blockly.FieldDropdown(config.durationTypes[opposites]), "DURATIONTYPE_LIST");
}

function payout(block, opposites){
	block.appendValueInput("AMOUNT")
		.setCheck("Number")
		.appendField(translator.translateText("Payout:"))
		.appendField(new Blockly.FieldDropdown(config.lists.PAYOUTTYPE), "PAYOUTTYPE_LIST");
	block.appendDummyInput()
		.appendField(translator.translateText("Currency:"))
		.appendField(new Blockly.FieldDropdown(config.lists.CURRENCY), "CURRENCY_LIST");
}

function barrierOffset(block, opposites) {
	block.appendValueInput("BARRIEROFFSET")
		.setCheck("Number")
		.appendField(new Blockly.FieldDropdown(config.barrierTypes), "BARRIEROFFSETTYPE_LIST");
}

function prediction(block, opposites){
	block.appendValueInput("PREDICTION")
		.setCheck("Number")
		.appendField(translator.translateText("Prediction:"));
}

export {duration, payout, prediction, title, barrierOffset};
