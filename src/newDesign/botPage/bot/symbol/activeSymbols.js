
var _ = require('underscore');

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
                var that = this;
                var markets = _.groupBy(this.activeSymbols, 'market');
                var parsedMarkets = [];
                Object.keys(markets).forEach(function(key){
                    var marketName = key;
                    var marketSymbols = markets[key];
                    var symbol = marketSymbols[0];
                    that.markets[marketName] = {
                        name: symbol.market_display_name,
                        is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
                    };
                    that.getSubmarketsForMarket(that.markets[marketName]);
                });
                return _.clone(this.markets);
            }
        }
    },
    getSubmarketsForMarket: {
        value: function getSubmarketsForMarket(market) {
            if ( !_.isEmpty(market.submarkets) ) {
                return _.clone(market.submarkets);
            } else {
                market.submarkets = {};
                var that = this;
                var submarkets = _.groupBy(this.activeSymbols, 'submarket');
                var parsedSubmarkets = [];
                Object.keys(submarkets).forEach(function(key){
                    var submarketName = key;
                    var submarketSymbols = submarkets[key];
                    var symbol = submarketSymbols[0];
                    market.submarkets[submarketName] = {
                        name: symbol.submarket_display_name,
                        is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
                    };
                    that.getSymbolsForSubmarket(market.submarkets[submarketName]);
                });
                return _.clone(market.submarkets);
            }
        }
    },
    getSymbolsForSubmarket: {
        value: function getSymbolsForSubmarket(submarket) {
            if ( !_.isEmpty(submarket.symbols) ) {
                return _.clone(submarket.symbols);
            } else {
                submarket.symbols = {};
                this.activeSymbols.filter(function(el){
                    if(el.submarket_display_name === submarket.name) {
                        return el;
                    }
                }).forEach(function(symbol){
                    submarket.symbols[symbol.symbol] = {
                        display: symbol.display_name,
                        symbol_type: symbol.symbol_type,
                        is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
                        pip: symbol.pip,
                        market: symbol.market,
                        submarket: symbol.submarket
                    };
                });
                return _.clone(submarket.symbols);
            }
        }
    },
    getSubmarkets: {
        value: function getSubmarkets() {
            if ( !_.isEmpty(this.submarkets) ) {
                return _.clone(this.submarkets);
            } else {
                var markets = this.getMarkets();
                var that = this;
                Object.keys(markets).forEach(function(key){
                    var market = markets[key];
                    var submarkets = that.getSubmarketsForMarket(market);
                    _.extend(that.submarkets, submarkets);
                });
                return _.clone(this.submarkets);
            }
        }
    },
    getSymbols: {
        value: function getSymbols() {
            if ( !_.isEmpty(this.symbols) ) {
                return _.clone(this.symbols);
            } else {
                var submarkets = this.getSubmarkets();
                var that = this;
                Object.keys(submarkets).forEach(function(key){
                    var submarket = submarkets[key];
                    var symbols = that.getSymbolsForSubmarket(submarket);
                    _.extend(that.symbols, symbols);
                });
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
