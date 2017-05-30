import React from 'react';
import ReactDOM from 'react-dom';
import TradeTable from './TradeTable';

ReactDOM.render(<TradeTable trade={{}} />, $('#tradeInfo')[0]);

export function open() {
    ReactDOM.render(<TradeTable trade={{}} />, $('#tradeInfo')[0]);
}

export default function updateTradeTable(trade) {
    ReactDOM.render(<TradeTable trade={{ reference: trade.transaction_ids.buy, ...trade }} />, $('#tradeInfo')[0]);
}
