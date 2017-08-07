import json2csv from 'json2csv';
import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
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
    constructor({ accountID }) {
        super();
        this.state = {
            initial: {
                id  : 0,
                rows: [],
            },
            [accountID]: {
                id  : 0,
                rows: [],
            },
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

            const accountStat = this.getAccountStat(accountID);

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
        const { accountID } = this.props;
        return this.state[accountID].rows[i];
    }
    export() {
        const { accountID } = this.props;

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
    getAccountStat(accountID) {
        if (!(accountID in this.state)) {
            const initialInfo = this.state.initial;
            this.setState({ [accountID]: { ...initialInfo } });
            return initialInfo;
        }
        return this.state[accountID];
    }
    render() {
        const { accountID } = this.props;
        const rows = accountID in this.state ? this.state[accountID].rows : [];

        return (
            <div>
                <ExportButton onClick={() => this.export()} customStyle={style.tradeTableExport} />
                <ReactDataGrid
                    columns={this.columns}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={rows.length}
                    minHeight={minHeight}
                />
            </div>
        );
    }
}
