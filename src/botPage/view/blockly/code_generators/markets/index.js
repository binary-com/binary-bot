var blockly = require('blockly');
var globals = require('../../../globals/globals');
var symbolNames = globals.activeSymbols.getSymbolNames();
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
