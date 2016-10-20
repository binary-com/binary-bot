import _ from 'underscore'

let apiActiveSymbols
let groupedMarkets
let groupedSubmarkets

const parsedMarkets = {}
const parsedSubmarkets = {}
const parsedSymbols = {}

const parseSymbols = () => {
  for (const s of apiActiveSymbols) {
    const submarket = parsedSubmarkets[s.submarket]
    submarket.symbols = submarket.symbols || {}
    parsedSymbols[s.symbol.toLowerCase()] = submarket.symbols[s.symbol.toLowerCase()] = {
      ...s,
      display: s.display_name,
      is_active: !s.is_trading_suspended && s.exchange_is_open,
    }
  }
}

const parseSubmarkets = () => {
  for (const k of Object.keys(groupedSubmarkets)) {
    const symbol = groupedSubmarkets[k][0]
    const market = parsedMarkets[symbol.market]
    market.submarkets = market.submarkets || {}
    parsedSubmarkets[k] = market.submarkets[k] = {
      name: symbol.submarket_display_name,
      is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
    }
  }
}

const parseMarkets = () => {
  for (const k of Object.keys(groupedMarkets)) {
    const symbol = groupedMarkets[k][0]
    parsedMarkets[k] = {
      name: symbol.market_display_name,
      is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
    }
  }
}

export default class ActiveSymbols {
  constructor(activeSymbols) {
    apiActiveSymbols = activeSymbols
    groupedMarkets = _.groupBy(apiActiveSymbols, 'market')
    groupedSubmarkets = _.groupBy(apiActiveSymbols, 'submarket')
    parseMarkets()
    parseSubmarkets()
    parseSymbols()
  }
  getMarkets() {
    return parsedMarkets
  }
  getSymbols() {
    return parsedSymbols
  }
}
