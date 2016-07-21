'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zr2375
import blockly from 'blockly';
import Translator from 'translator';
var translator = new Translator();
import relationChecker from '../../relationChecker';
import Bot from '../../../../bot';
var bot = new Bot();
var symbolNames = bot.symbol.activeSymbols.getSymbolNames();

Object.keys(symbolNames).forEach(function(symbol){
	blockly.Blocks[symbol.toLowerCase()] = {
		init: function() {
			this.appendDummyInput()
				.appendField(symbolNames[symbol]);
			this.appendDummyInput()
				.appendField(translator.translateText('Accepts') + ': (' + bot.symbol.getAllowedCategoryNames(symbol) + ')');
			this.appendStatementInput("CONDITION")
				.setCheck("Condition");
			this.setInputsInline(false);
			this.setPreviousStatement(true, "Submarket");
			this.setColour("#f2f2f2");
			this.setTooltip(translator.translateText('Chooses the symbol:') + ' ' + symbolNames[symbol]);
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev){
			relationChecker.submarket(this, ev);
		}
	};
});
