var activeSymbols = require('./activeSymbols');

var markets = {};
markets.symbolActions = {};
var symbolNames = activeSymbols.getSymbolNames();
Object.keys(symbolNames).forEach(function (symbol) {
	markets.symbolActions[symbol] = function (options) {
		trade.setSymbol(symbol);
		options.forEach(function (option) {
			option.symbol = symbol;
		});
		var submarket = function submarket(cb) {
			trade.submitProposal(options[0]);
			trade.submitProposal(options[1]);
		};
		return submarket;
	};
});
module.exports = markets;
