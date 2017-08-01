import json2csv from 'json2csv';
import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { appendRow, updateRow, saveAs } from '../shared';
import { translate } from '../../../common/i18n';
import ExportButton from '../react-components/ExportButton';
import * as style from '../style';

const isNumber = num => num !== '' && Number.isFinite(Number(num));

const getProfit = ({ sell_price: sellPrice, buy_price: buyPrice }) => {
    if (isNumber(sellPrice) && isNumber(buyPrice)) {
        return Number(Number(sellPrice) - Number(buyPrice)).toFixed(2);
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
            initial: {
                id  : 0,
                rows: [],
            },
            accountID: 'initial',
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
    componentWillMount() {
        globalObserver.register('bot.contract', info => {
            if (!info) {
                return;
            }
            const tradeObj = { reference: info.transaction_ids.buy, ...info };
            const { accountID } = tradeObj;

            const trade = {
                ...tradeObj,
                profit: getProfit(tradeObj),
            };

            const accountStat = this.getaccountStat(accountID);

            this.setState({ accountID });
            const rows = accountStat.rows;
            const prevRowIndex = rows.findIndex(t => t.reference === trade.reference);

            if (prevRowIndex >= 0) {
                this.setState({ [accountID]: updateRow(prevRowIndex, trade, accountStat) });
            } else {
                this.setState({ [accountID]: appendRow(trade, accountStat) });
            }
        });
    }
    rowGetter(i) {
        const { accountID } = this.state;
        return this.state[accountID].rows[i];
    }
    export() {
        const { accountID } = this.state;

        const data = json2csv({
            data  : this.state[accountID].rows,
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
    getaccountStat(accountID) {
        if (!(accountID in this.state)) {
            const initialInfo = this.state.initial;
            this.setState({ [accountID]: { ...initialInfo } });
            return initialInfo;
        }
        return this.state[accountID];
    }
    render() {
        const { accountID } = this.state;

        return (
            <div>
                <h3>
                    <span>
                        {translate('Trades')}
                    </span>
                </h3>

                <ExportButton onClick={() => this.export()} customStyle={style.tradeTableExport} />
                <ReactDataGrid
                    columns={this.columns}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={this.state[accountID].rows.length}
                    minHeight={minHeight}
                />
            </div>
        );
    }
}
