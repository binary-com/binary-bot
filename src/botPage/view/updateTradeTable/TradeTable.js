import json2csv from 'json2csv';
import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { appendRow, updateRow, saveAs } from '../shared';
import { translate } from '../../../common/i18n';
import { roundBalance } from '../../common/tools';
import ExportButton from '../react-components/ExportButton';
import * as style from '../style';

const isNumber = num => num !== '' && Number.isFinite(Number(num));

const getProfit = ({ sell_price: sellPrice, buy_price: buyPrice, currency }) => {
    if (isNumber(sellPrice) && isNumber(buyPrice)) {
        return roundBalance({
            currency,
            balance: Number(sellPrice) - Number(buyPrice),
        });
    }
    return '';
};

const minHeight = 380;

const ProfitColor = ({ value }) =>
    <div style={value > 0 ? style.green : style.red}>
        {value}
    </div>;

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
    export() {
        const data = json2csv({
            data  : this.state.rows,
            fields: [
                'id',
                'reference',
                'contract_type',
                'entry_tick',
                'exit_tick',
                'buy_price',
                'sell_price',
                'profit',
            ],
        });
        saveAs({ data, filename: 'logs.csv', type: 'text/csv;charset=utf-8' });
    }
    render() {
        if (!$('#tradeInfo:visible').length) {
            return <div style={{ height: minHeight }} />;
        }
        return (
            <div>
                <ExportButton onClick={() => this.export()} customStyle={style.tradeTableExport} />
                <ReactDataGrid
                    columns={this.columns}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={this.state.rows.length}
                    minHeight={minHeight}
                />
            </div>
        );
    }
}
