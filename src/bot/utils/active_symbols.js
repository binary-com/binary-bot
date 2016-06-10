var ActiveSymbols = (function () {
    'use strict';

    var groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    var extend = function extend(a, b) {
        a = (a) ? a : {};
        if ( b ) {
            Object.keys(b).forEach(function(key){
                a[key] = b[key];
            });
        }
    };

    var objectNotEmpty = function objectNotEmpty(obj){
        return obj && obj instanceof Object && Object.keys(obj).length;
    };

    var clone = function clone(obj){
        var newObj = {};
        extend(newObj, obj);
        return newObj;
    };

    var activeSymbols = {
        markets: {},
        submarkets: {},
        symbols: {},
        getMarkets: function getMarkets(activeSymbols) {
            if ( objectNotEmpty(this.markets) ) {
                return clone(this.markets);
            } else {
                var that = this;
                var markets = groupBy(activeSymbols, 'market');
                var parsedMarkets = [];
                Object.keys(markets).forEach(function(key){
                    var marketName = key;
                    var marketSymbols = markets[key];
                    var symbol = marketSymbols[0];
                    that.markets[marketName] = {
                        name: symbol.market_display_name,
                        is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
                    };
                    that.getSubmarketsForMarket(marketSymbols, that.markets[marketName]);
                });
                return clone(this.markets);
            }
        },
        getSubmarketsForMarket: function getSubmarketsForMarket(activeSymbols, market) {
            if ( objectNotEmpty(market.submarkets) ) {
                return clone(market.submarkets);
            } else {
                market.submarkets = {};
                var that = this;
                var submarkets = groupBy(activeSymbols, 'submarket');
                var parsedSubmarkets = [];
                Object.keys(submarkets).forEach(function(key){
                    var submarketName = key;
                    var submarketSymbols = submarkets[key];
                    var symbol = submarketSymbols[0];
                    market.submarkets[submarketName] = {
                        name: symbol.submarket_display_name,
                        is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
                    };
                    that.getSymbolsForSubmarket(submarketSymbols, market.submarkets[submarketName]);
                });
                return clone(market.submarkets);
            }
        },
        getSymbolsForSubmarket: function getSymbolsForSubmarket(activeSymbols, submarket) {
            if ( objectNotEmpty(submarket.symbols) ) {
                return clone(submarket.symbols);
            } else {
                submarket.symbols = {};
                activeSymbols.forEach(function(symbol){
                    submarket.symbols[symbol.symbol] = {
                        display: symbol.display_name,
                        symbol_type: symbol.symbol_type,
                        is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
                        pip: symbol.pip,
                        market: symbol.market,
                        submarket: symbol.submarket
                    };
                });
                return clone(submarket.symbols);
            }
        },
        getSubmarkets: function getSubmarkets(active_symbols) {
            if ( objectNotEmpty(this.submarkets) ) {
                return clone(this.submarkets);
            } else {
                var markets = this.getMarkets(active_symbols);
                var that = this;
                Object.keys(markets).forEach(function(key){
                    var market = markets[key];
                    var submarkets = that.getSubmarketsForMarket(active_symbols, market);
                    extend(that.submarkets, submarkets);
                });
                return clone(this.submarkets);
            }
        },
        getSymbols: function getSymbols(active_symbols) {
            if ( objectNotEmpty(this.symbols) ) {
                return clone(this.symbols);
            } else {
                var submarkets = this.getSubmarkets(active_symbols);
                var that = this;
                Object.keys(submarkets).forEach(function(key){
                    var submarket = submarkets[key];
                    var symbols = that.getSymbolsForSubmarket(active_symbols, submarket);
                    extend(that.symbols, symbols);
                });
                return clone(this.symbols);
            }
        },
        getMarketsList: function getMarketsList(active_symbols) {
            var tradeMarketsList = {};
            extend(tradeMarketsList, this.getMarkets(active_symbols));
            extend(tradeMarketsList, this.getSubmarkets(active_symbols));
            return tradeMarketsList;
        },
        getTradeUnderlyings: function getTradeUnderlyings(active_symbols) {
            var tradeUnderlyings = {};
            var symbols = this.getSymbols(active_symbols);
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
        },
        getSymbolNames: function getSymbolNames(active_symbols){
            var symbols = clone(this.getSymbols(active_symbols));
            Object.keys(symbols).map(function(key){
                symbols[key] = symbols[key].display;
            });
            return symbols;
        },
    };
    if (typeof module !== 'undefined') {
        module.exports = activeSymbols;
    }
    return activeSymbols;
})();
