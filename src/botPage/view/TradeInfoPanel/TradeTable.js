/* eslint-disable no-await-in-loop */
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

const getTimestamp = date => {
    const buyDate = new Date(date * 1000);
    return `${buyDate.toISOString().split('T')[0]} ${buyDate.toTimeString().slice(0, 8)} ${
        buyDate.toTimeString().split(' ')[1]
    }`;
};

const minHeight = 290;
const rowHeight = 25;

const ProfitColor = ({ value }) => <div style={value > 0 ? style.greenLeft : style.redLeft}>{value}</div>;
const StatusFormat = ({ value }) => <div style={style.left}>{value}</div>;

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
            { key: 'reference', width: 110, resizable: true, name: translate('Reference') },
            { key: 'contract_type', width: 70, resizable: true, name: translate('Trade type') },
            { key: 'entry_tick', width: 82, resizable: true, name: translate('Entry spot') },
            { key: 'exit_tick', width: 82, resizable: true, name: translate('Exit spot') },
            { key: 'buy_price', width: 80, resizable: true, name: translate('Buy price') },
            { key: 'profit', width: 80, resizable: true, name: translate('Profit/Loss'), formatter: ProfitColor },
            { key: 'contract_status', width: 70, resizable: true, name: translate('Status'), formatter: StatusFormat },
        ];
    }

    static getTradeObject(contract) {
        const tradeObj = {
            ...contract,
            reference: `${contract.transaction_ids.buy}`,
            buy_price: roundBalance({ balance: contract.buy_price, currency: contract.currency }),
            timestamp: getTimestamp(contract.date_start),
        };

        if (contract.entry_tick) {
            tradeObj.entry_tick = contract.entry_spot_display_value;
        }

        if (contract.exit_tick) {
            tradeObj.exit_tick = contract.exit_tick_display_value;
        }

        return tradeObj;
    }

    componentWillMount() {
        const { api } = this.props;

        globalObserver.register('summary.export', () => {
            const accountData = this.state[this.props.accountID];
            if (accountData && accountData.rows.length > 0) {
                this.export();
            }
        });

        globalObserver.register('summary.clear', () => {
            this.setState({ [this.props.accountID]: { ...this.state.initial } });
            globalObserver.emit('summary.disable_clear');
        });

        globalObserver.register('bot.stop', () => {
            const accountData = this.state[this.props.accountID];
            if (accountData && accountData.rows.length > 0) {
                globalObserver.emit('summary.enable_clear');
            }
        });

        globalObserver.register('bot.contract', contract => {
            if (!contract) {
                return;
            }

            const tradeObj = TradeTable.getTradeObject(contract);
            const trade = {
                ...tradeObj,
                profit          : getProfit(tradeObj),
                contract_status : translate('Pending'),
                contract_settled: false,
            };

            const { accountID } = tradeObj;
            const accountStat = this.getAccountStat(accountID);
            const { rows } = accountStat;
            const prevRowIndex = rows.findIndex(t => t.reference === trade.reference);

            if (trade.is_expired && trade.is_sold && !trade.exit_tick) {
                trade.exit_tick = '-';
            }

            if (prevRowIndex >= 0) {
                this.setState({ [accountID]: updateRow(prevRowIndex, trade, accountStat) });
            } else {
                this.setState({ [accountID]: appendRow(trade, accountStat) });
            }
        });

        globalObserver.register('contract.settled', contract => {
            const contractID = contract.contract_id;
            this.settleContract(api, contractID);
        });
    }

    async settleContract(api, contractID) {
        let settled = false;
        let delay = 3000;

        const sleep = () => new Promise(resolve => setTimeout(() => resolve(), delay));

        while (!settled) {
            await sleep();

            try {
                await this.refreshContract(api, contractID);

                const { accountID } = this.props;
                const rows = this.state[accountID].rows.slice();
                const contractRow = rows.find(row => row.contract_id === contractID);

                if (contractRow && contractRow.contract_settled) {
                    settled = true;
                }
            } catch (e) {
                // Do nothing. Loop again.
            } finally {
                delay *= 1.5;
            }
        }
    }

    refreshContract(api, contractID) {
        return api.getContractInfo(contractID).then(r => {
            const contract = r.proposal_open_contract;
            const tradeObj = TradeTable.getTradeObject(contract);
            const trade = {
                ...tradeObj,
                profit: getProfit(tradeObj),
            };

            if (trade.is_expired && trade.is_sold && !trade.exit_tick) {
                trade.exit_tick = '-';
            }

            const { accountID } = this.props;
            const { id } = this.state[accountID];
            const rows = this.state[accountID].rows.slice();

            const updatedRows = rows.map(row => {
                const { reference } = row;

                if (reference === trade.reference) {
                    return {
                        contract_status : translate('Settled'),
                        contract_settled: true,
                        reference,
                        ...trade,
                    };
                }
                return row;
            });

            this.setState({ [accountID]: { id, rows: updatedRows } });
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
