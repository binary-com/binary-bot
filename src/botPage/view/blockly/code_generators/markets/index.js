var blockly = require('blockly');
var globals = require('../../../globals/globals');
var Bot = require('../../../../bot');
var bot = new Bot();
var symbolNames = bot.symbol.activeSymbols.getSymbolNames();
Object.keys(symbolNames).forEach(function(symbol){
	blockly.JavaScript[symbol.toLowerCase()] = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var condition = blockly.JavaScript.statementToCode(block, 'CONDITION');
		if ( !condition ) {
			throw {message: 'A condition has to be defined for the symbol'};
		}
		var code = 'Bot.markets.symbolActions.' + symbol + '('+condition.trim()+')';
		return code;
	};
});
