import _ from 'underscore'

let apiActiveSymbols
let groupedMarkets
let groupedSubmarkets

const parsedMarkets = {}
const parsedSubmarkets = {}
const parsedSymbols = {}

const parseSymbols = () => {
  const symbols = apiActiveSymbols
  for (const symbol of symbols) {
    const submarket = parsedSubmarkets[symbol.submarket]
    submarket.symbols = submarket.symbols || {}
    parsedSymbols[symbol.symbol] = submarket.symbols[symbol.symbol] = {
      display: symbol.display_name,
      symbol_type: symbol.symbol_type,
      is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
      pip: symbol.pip,
      market: symbol.market,
      submarket: symbol.submarket,
    }
  }
}

const parseSubmarkets = () => {
  for (const submarketName of Object.keys(groupedSubmarkets)) {
    const submarketSymbols = groupedSubmarkets[submarketName]
    const symbol = submarketSymbols[0]
    const market = parsedMarkets[symbol.market]
    market.submarkets = market.submarkets || {}
    parsedSubmarkets[submarketName] = market.submarkets[submarketName] = {
      name: symbol.submarket_display_name,
      is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
    }
  }
  parseSymbols()
}

const parseMarkets = () => {
  for (const marketName of Object.keys(groupedMarkets)) {
    const marketSymbols = groupedMarkets[marketName]
    const symbol = marketSymbols[0]
    parsedMarkets[marketName] = {
      name: symbol.market_display_name,
      is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
    }
  }
  parseSubmarkets()
}

export default class ActiveSymbols {
  constructor(activeSymbols) {
    apiActiveSymbols = activeSymbols
    groupedMarkets = _.groupBy(apiActiveSymbols, 'market')
    groupedSubmarkets = _.groupBy(apiActiveSymbols, 'submarket')
    parseMarkets()
  }
  getMarkets() {
    return parsedMarkets
  }
  getSymbols() {
    return parsedSymbols
  }
  getSymbolNames() {
    const symbols = _.clone(parsedSymbols)
    for (const key of Object.keys(symbols)) {
      symbols[key] = symbols[key].display
    }
    return symbols
  }
}
