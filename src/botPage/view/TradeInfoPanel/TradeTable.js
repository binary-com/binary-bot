import json2csv from 'json2csv';
import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { observer as globalObserver } from '../../../common/utils/observer';
import { appendRow, updateRow, saveAs } from '../shared';
import { translate } from '../../../common/i18n';
import { roundBalance } from '../../common/tools';
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

const minHeight = 290;
const rowHeight = 25;

const ProfitColor = ({ value }) => <div style={value > 0 ? style.green : style.red}>{value}</div>;

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
            { key: 'timestamp', width: 192, resizable: true, name: translate('Timestamp') },
            { key: 'reference', width: 142, resizable: true, name: translate('Reference') },
            { key: 'contract_type', width: 104, resizable: true, name: translate('Trade type') },
            { key: 'entry_tick', width: 80, resizable: true, name: translate('Entry spot') },
            { key: 'exit_tick', width: 70, resizable: true, name: translate('Exit spot') },
            { key: 'buy_price', width: 80, resizable: true, name: translate('Buy price') },
            { key: 'profit', width: 80, resizable: true, name: translate('Profit/Loss'), formatter: ProfitColor },
        ];
    }
    componentWillMount() {
        globalObserver.register('summary.export', () => {
            const { accountID } = this.props;
            const { rows } = this.state[accountID];
            if (rows.length) this.export();
        });
        globalObserver.register('bot.contract', info => {
            if (!info) {
                return;
            }
            const buyDate = new Date(info.date_start * 1000);
            const timestamp = `${buyDate.toISOString().split('T')[0]} ${buyDate.toTimeString().slice(0, 8)} ${
                buyDate.toTimeString().split(' ')[1]
            }`;
            const tradeObj = { reference: info.transaction_ids.buy, ...info, timestamp };
            const { accountID } = tradeObj;

            const trade = {
                ...tradeObj,
                profit: getProfit(tradeObj),
            };

            const accountStat = this.getAccountStat(accountID);

            const { rows } = accountStat;
            const prevRowIndex = rows.findIndex(t => t.reference === trade.reference);

            if (trade.is_expired && trade.is_sold && !trade.exit_tick) trade.exit_tick = '-';

            if (prevRowIndex >= 0) {
                this.setState({ [accountID]: updateRow(prevRowIndex, trade, accountStat) });
            } else {
                this.setState({ [accountID]: appendRow(trade, accountStat) });
            }
        });
    }
    rowGetter(i) {
        const { accountID } = this.props;
        const { rows } = this.state[accountID];
        return rows[rows.length - 1 - i];
    }
    export() {
        const { accountID } = this.props;

        const data = json2csv({
            data  : this.state[accountID].rows,
            fields: [
                'id',
                'timestamp',
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
                <ReactDataGrid
                    columns={this.columns}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={rows.length}
                    minHeight={minHeight}
                    rowHeight={rowHeight}
                />
            </div>
        );
    }
}
