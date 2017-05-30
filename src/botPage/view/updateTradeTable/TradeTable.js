import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { appendRow, updateRow } from '../shared';
import { translate } from '../../../common/i18n';

const isNumber = num => num !== '' && Number.isFinite(Number(num));

const getProfit = ({ sell_price: sellPrice, buy_price: buyPrice }) => {
    if (isNumber(sellPrice) && isNumber(buyPrice)) {
        return Number(Number(sellPrice) - Number(buyPrice)).toFixed(2);
    }
    return '';
};

const minHeight = 380;

const ProfitColor = ({ value }) => <div style={{ color: value > 0 ? 'green' : 'red' }}>{value}</div>;

export default class TradeTable extends Component {
    constructor() {
        super();
        this.state = {
            id  : 0,
            rows: [],
        };
        this.columns = [
            { key: 'id', width: 70, resizable: true, name: translate('Number') },
            { key: 'reference', width: 110, resizable: true, name: translate('Reference') },
            { key: 'contract_type', width: 80, resizable: true, name: translate('Trade type') },
            { key: 'entry_tick', width: 80, resizable: true, name: translate('Entry spot') },
            { key: 'exit_tick', width: 80, resizable: true, name: translate('Exit spot') },
            { key: 'buy_price', width: 80, resizable: true, name: translate('Buy price') },
            { key: 'sell_price', width: 80, resizable: true, name: translate('Final price') },
            { key: 'profit', width: 80, resizable: true, name: translate('Profit/Loss'), formatter: ProfitColor },
        ];
    }
    componentWillReceiveProps(nextProps) {
        const { trade: tradeObj } = nextProps;
        if (!Object.keys(tradeObj).length) {
            return;
        }
        const trade = {
            ...tradeObj,
            profit: getProfit(tradeObj),
        };
        const prevRowIndex = this.state.rows.findIndex(t => t.reference === trade.reference);
        if (prevRowIndex >= 0) {
            this.setState(updateRow(prevRowIndex, trade, this.state));
        } else {
            this.setState(appendRow(trade, this.state));
        }
    }
    rowGetter(i) {
        return this.state.rows[i];
    }

    render() {
        if (!$('#tradeInfo:visible').length) {
            return <div style={{ height: minHeight }} />;
        }
        return (
            <ReactDataGrid
                columns={this.columns}
                rowGetter={this.rowGetter.bind(this)}
                rowsCount={this.state.rows.length}
                minHeight={minHeight}
            />
        );
    }
}
