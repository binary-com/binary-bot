import _ from 'underscore';

export default class ActiveSymbols {
  constructor(activeSymbols) {
    this.activeSymbols = activeSymbols;
    this.markets = {};
    this.submarkets = {};
    this.symbols = {};
    this.getMarkets();
  }
  getMarkets() {
    if (!_.isEmpty(this.markets)) {
      return this.markets;
    }
    let markets = _.groupBy(this.activeSymbols, 'market');
    for (let marketName of Object.keys(markets)) {
      let marketSymbols = markets[marketName];
      let symbol = marketSymbols[0];
      this.markets[marketName] = {
        name: symbol.market_display_name,
        is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
      };
      this.getSubmarketsForMarket(marketName);
    }
    return this.markets;
  }
  getSubmarketsForMarket(marketName) {
    let market = this.markets[marketName];
    market.submarkets = {};
    let submarkets = _.groupBy(_.groupBy(this.activeSymbols, 'market')[marketName], 'submarket');
    for (let submarketName of Object.keys(submarkets)) {
      let submarketSymbols = submarkets[submarketName];
      let symbol = submarketSymbols[0];
      this.submarkets[submarketName] = market.submarkets[submarketName] = {
        name: symbol.submarket_display_name,
        is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
      };
      this.getSymbolsForSubmarket(submarketName);
    }
    return market.submarkets;
  }
  getSymbolsForSubmarket(submarketName) {
    let submarket = this.submarkets[submarketName];
    submarket.symbols = {};
    let symbols = _.groupBy(this.activeSymbols, 'submarket')[submarketName];
    for (let symbol of symbols) {
      this.symbols[symbol.symbol] = submarket.symbols[symbol.symbol] = {
        display: symbol.display_name,
        symbol_type: symbol.symbol_type,
        is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
        pip: symbol.pip,
        market: symbol.market,
        submarket: symbol.submarket,
      };
    }
    return submarket.symbols;
  }
  getSubmarkets() {
    if (!_.isEmpty(this.submarkets)) {
      return this.submarkets;
    }
    this.getMarkets();
    return this.submarkets;
  }
  getSymbols() {
    if (!_.isEmpty(this.symbols)) {
      return this.symbols;
    }
    this.getMarkets();
    return this.symbols;
  }
  getMarketsList() {
    let tradeMarketsList = {};
    _.extend(tradeMarketsList, this.getMarkets());
    _.extend(tradeMarketsList, this.getSubmarkets());
    return tradeMarketsList;
  }
  getTradeUnderlyings() {
    let tradeUnderlyings = {};
    let symbols = this.getSymbols();
    for (let key of Object.keys(symbols)) {
      let symbol = symbols[key];
      if (!tradeUnderlyings[symbol.market]) {
        tradeUnderlyings[symbol.market] = {};
      }
      if (!tradeUnderlyings[symbol.submarket]) {
        tradeUnderlyings[symbol.submarket] = {};
      }
      tradeUnderlyings[symbol.market][key] = symbol;
      tradeUnderlyings[symbol.submarket][key] = symbol;
    }
    return tradeUnderlyings;
  }
  getSymbolNames() {
    let symbols = _.clone(this.getSymbols());
    for (let key of Object.keys(symbols)) {
      symbols[key] = symbols[key].display;
    }
    return symbols;
  }
}
