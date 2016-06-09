var config = require('../globals/config');
var trade = require('./trade');
var markets = {};
markets.volatility = {};
config.ticktrade_markets.forEach(function (market) {
	markets.volatility[market] = function (options) {
		var symbol = market.toUpperCase();

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
