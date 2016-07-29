'use strict';

import _ from 'underscore';

var ActiveSymbols = function ActiveSymbols(activeSymbols) {
	if ( ActiveSymbols.instance ) {
		return ActiveSymbols.instance;
	}
	ActiveSymbols.instance = this;
	this.activeSymbols = activeSymbols;
	this.markets = {};
	this.submarkets = {};
	this.symbols = {};
	this.getMarkets();
};

ActiveSymbols.prototype = Object.create(null, {
	getMarkets: {
		value: function getMarkets() {
			if ( !_.isEmpty(this.markets) ) {
				return _.clone(this.markets);
			} else {
				var markets = _.groupBy(this.activeSymbols, 'market');
				for ( var marketName in markets ) {
					var marketSymbols = markets[marketName];
					var symbol = marketSymbols[0];
					this.markets[marketName] = {
						name: symbol.market_display_name,
						is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
					};
					this.getSubmarketsForMarket(marketName);
				}
				return _.clone(this.markets);
			}
		}
	},
	getSubmarketsForMarket: {
		value: function getSubmarketsForMarket(marketName) {
			var market = this.markets[marketName];
			market.submarkets = {};
			var submarkets = _.groupBy(_.groupBy(this.activeSymbols, 'market')[marketName], 'submarket');
			for ( var submarketName in submarkets ) {
				var submarketSymbols = submarkets[submarketName];
				var symbol = submarketSymbols[0];
				this.submarkets[submarketName] = market.submarkets[submarketName] = {
					name: symbol.submarket_display_name,
					is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
				};
				this.getSymbolsForSubmarket(submarketName);
			}
			return _.clone(market.submarkets);
		}
	},
	getSymbolsForSubmarket: {
		value: function getSymbolsForSubmarket(submarketName) {
			var submarket = this.submarkets[submarketName];
			submarket.symbols = {};
			var symbols = _.groupBy(this.activeSymbols, 'submarket')[submarketName];
			for ( var i in symbols ) {
				this.symbols[symbols[i].symbol] = submarket.symbols[symbols[i].symbol] = {
					display: symbols[i].display_name,
					symbol_type: symbols[i].symbol_type,
					is_active: !symbols[i].is_trading_suspended && symbols[i].exchange_is_open,
					pip: symbols[i].pip,
					market: symbols[i].market,
					submarket: symbols[i].submarket
				};
			}
			return _.clone(submarket.symbols);
		}
	},
	getSubmarkets: {
		value: function getSubmarkets() {
			if ( !_.isEmpty(this.submarkets) ) {
				return _.clone(this.submarkets);
			} else {
				this.getMarkets();
				return _.clone(this.submarkets);
			}
		}
	},
	getSymbols: {
		value: function getSymbols() {
			if ( !_.isEmpty(this.symbols) ) {
				return _.clone(this.symbols);
			} else {
				this.getMarkets();
				return _.clone(this.symbols);
			}
		}
	},
	getMarketsList: {
		value: function getMarketsList() {
			var tradeMarketsList = {};
			_.extend(tradeMarketsList, this.getMarkets());
			_.extend(tradeMarketsList, this.getSubmarkets());
			return tradeMarketsList;
		}
	},
	getTradeUnderlyings: {
		value: function getTradeUnderlyings() {
			var tradeUnderlyings = {};
			var symbols = this.getSymbols();
			Object.keys(symbols).forEach(function(key){
				var symbol = symbols[key];
				if ( !tradeUnderlyings[symbol.market] ) {
					tradeUnderlyings[symbol.market] = {};
				}
				if ( !tradeUnderlyings[symbol.submarket] ) {
					tradeUnderlyings[symbol.submarket] = {};
				}
				tradeUnderlyings[symbol.market][key] = symbol;
				tradeUnderlyings[symbol.submarket][key] = symbol;
			});
			return tradeUnderlyings;
		}
	},
	getSymbolNames: {
		value: function getSymbolNames(){
			var symbols = _.clone(this.getSymbols());
			Object.keys(symbols).map(function(key){
				symbols[key] = symbols[key].display;
			});
			return symbols;
		},
	}
});

module.exports = ActiveSymbols;
