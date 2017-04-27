const groupBy = (arr, field) =>
    arr.reduce((g, o) => {
        const grouped = { ...g };

        if (o[field] in grouped) {
            grouped[o[field]].push(o);
        } else {
            grouped[o[field]] = [o];
        }

        return grouped;
    }, {});

let apiActiveSymbols;
let groupedMarkets;
let groupedSubmarkets;

const parsedMarkets = {};
const parsedSubmarkets = {};
const parsedSymbols = {};

const parseSymbols = () => {
    apiActiveSymbols.forEach(s => {
        const submarket = parsedSubmarkets[s.submarket];
        submarket.symbols = submarket.symbols || {};
        const symbol = {
            ...s,
            display  : s.display_name,
            is_active: !s.is_trading_suspended && s.exchange_is_open,
        };
        parsedSymbols[s.symbol.toLowerCase()] = symbol;
        submarket.symbols[s.symbol.toLowerCase()] = symbol;
    });
};

const parseSubmarkets = () => {
    Object.keys(groupedSubmarkets).forEach(k => {
        const symbol = groupedSubmarkets[k][0];
        const market = parsedMarkets[symbol.market];
        market.submarkets = market.submarkets || {};
        const submarket = {
            name     : symbol.submarket_display_name,
            is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
        };
        parsedSubmarkets[k] = submarket;
        market.submarkets[k] = submarket;
    });
};

const parseMarkets = () => {
    Object.keys(groupedMarkets).forEach(k => {
        const symbol = groupedMarkets[k][0];
        parsedMarkets[k] = {
            name     : symbol.market_display_name,
            is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
        };
    });
};

export default class ActiveSymbols {
    constructor(activeSymbols) {
        apiActiveSymbols = activeSymbols;
        groupedMarkets = groupBy(apiActiveSymbols, 'market');
        groupedSubmarkets = groupBy(apiActiveSymbols, 'submarket');
        parseMarkets();
        parseSubmarkets();
        parseSymbols();
    }
    /* eslint-disable class-methods-use-this */
    getMarkets() {
        return parsedMarkets;
    }
    getSymbols() {
        return parsedSymbols;
    }
    /* eslint-enable */
}
