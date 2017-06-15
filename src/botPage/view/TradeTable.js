import React, { Component } from 'react';
import { translate } from '../../common/i18n';

const ReactDataGrid = require('react-data-grid');

const isNumber = num => num !== '' && Number.isFinite(Number(num));

const getProfit = ({ sell_price: sellPrice, buy_price: buyPrice }) => {
    if (isNumber(sellPrice) && isNumber(buyPrice)) {
        return Number(Number(sellPrice) - Number(buyPrice)).toFixed(2);
    }
    return '';
};

export default class TradeTable extends Component {
    constructor() {
        super();
        this.state = {
            id  : 0,
            rows: [],
        };
        this.columns = [
            { key: 'id', resizable: true, name: translate('Number') },
            { key: 'reference', resizable: true, name: translate('Reference') },
            { key: 'contract_type', resizable: true, name: translate('Trade type') },
            { key: 'entry_tick', resizable: true, name: translate('Entry spot') },
            { key: 'exit_tick', resizable: true, name: translate('Exit spot') },
            { key: 'buy_price', resizable: true, name: translate('Buy price') },
            { key: 'sell_price', resizable: true, name: translate('Final price') },
            { key: 'profit', resizable: true, name: translate('Profit/Loss') },
        ];
    }
    componentWillReceiveProps(nextProps) {
        const appendRow = trade =>
            this.setState({
                id  : this.state.id + 1,
                rows: [
                    ...this.state.rows,
                    {
                        ...trade,
                        id: this.state.id + 1,
                    },
                ],
            });

        const updateRow = (prevRowIndex, trade) =>
            this.setState({
                rows: [
                    ...this.state.rows.slice(0, prevRowIndex),
                    {
                        ...trade,
                        id: this.state.id,
                    },
                ],
            });

        const { trade: tradeObj } = nextProps;
        const trade = {
            ...tradeObj,
            profit: getProfit(tradeObj),
        };
        const prevRowIndex = this.state.rows.findIndex(t => t.reference === trade.reference);
        if (prevRowIndex >= 0) {
            updateRow(prevRowIndex, trade);
        } else {
            appendRow(trade);
        }
    }
    rowGetter(i) {
        return this.state.rows[i];
    }

    render() {
        return (
            <ReactDataGrid
                columns={this.columns}
                rowGetter={this.rowGetter.bind(this)}
                rowsCount={this.state.rows.length}
                minHeight={200}
            />
        );
    }
}
