// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zr2375
var blockly = require('blockly');
var i18n = require('i18n');
var globals = require('../../globals/globals');
var botUtils = require('../../utils/utils');
var relationChecker = require('../../utils/relationChecker');
var symbolNames = globals.activeSymbols.getSymbolNames();
Object.keys(symbolNames).forEach(function(symbol){
	blockly.Blocks[symbol.toLowerCase()] = {
		init: function() {
			this.appendDummyInput()
				.appendField(symbolNames[symbol]);
			this.appendDummyInput()
				.appendField(i18n._('Accepts') + ': (' + botUtils.getAllowedCategoryNames(symbol) + ')');
			this.appendStatementInput("CONDITION")
				.setCheck("Condition");
			this.setInputsInline(false);
			this.setPreviousStatement(true, "Submarket");
			this.setColour(345);
			this.setTooltip(i18n._('Chooses the symbol:') + ' ' + symbolNames[symbol]);
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev){
			relationChecker.submarket(this, ev);
		}
	};
});
