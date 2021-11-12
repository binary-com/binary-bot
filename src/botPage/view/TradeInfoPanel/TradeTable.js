/* eslint-disable no-await-in-loop */
import json2csv from 'json2csv';
import Draggable from 'react-draggable';
import React, { Component } from 'react';
import { Table, Column } from 'react-virtualized';
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

const ProfitColor = ({ value }) => <div style={value > 0 ? style.greenLeft : style.redLeft}>{value}</div>;
const StatusFormat = ({ value }) => <div style={style.left}>{value}</div>;

export default class TradeTable extends Component {
    constructor({ accountID }) {
        super();
        this.state = {
            initial: {
                id: 0,
                rows: [],
            },
            [accountID]: {
                id: 0,
                rows: [],
            },
            widths: {
                timestamp: 0.5,
                reference: 0.24,
                contract_type: 0.2,
                entry_tick: 0.18,
                exit_tick: 0.16,
                buy_price: 0.18,
                profit: 0.2,
                contract_status: 0.16,
            },
        };
        this.columns = [
            { key: 'timestamp', label: translate('Timestamp') },
            { key: 'reference', label: translate('Reference') },
            { key: 'contract_type', label: translate('Trade type') },
            { key: 'entry_tick', label: translate('Entry spot') },
            { key: 'exit_tick', label: translate('Exit spot') },
            { key: 'buy_price', label: translate('Buy price') },
            { key: 'profit', label: translate('Profit/Loss') },
            { key: 'contract_status', label: translate('Status') },
        ];
        this.total_width = 750;
        this.min_height = 290;
        this.row_height = 25;
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
                profit: getProfit(tradeObj),
                contract_status: translate('Pending'),
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
            const rows = this.state[accountID].rows.slice();

            const updatedRows = rows.map(row => {
                const { reference } = row;

                if (reference === trade.reference) {
                    return {
                        contract_status: translate('Settled'),
                        contract_settled: true,
                        reference,
                        ...trade,
                    };
                }
                return row;
            });

            this.setState({ [accountID]: { rows: updatedRows } });
        });
    }

    rowGetter = ({ index }) => {
        const { accountID } = this.props;
        const { rows } = this.state[accountID];
        return rows[rows.length - 1 - index];
    };

    export() {
        const { accountID } = this.props;

        const rows = this.state[accountID].rows.map((item, index) => {
            const row = item;
            row.id = index + 1;
            return row;
        });
        const data = json2csv({
            data: rows,
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

    headerRenderer = ({ dataKey, label }) => {
        const headerIndex = this.columns.findIndex(col => col.key === dataKey);
        const isLastColumn = headerIndex + 1 === this.columns.length;

        return (
            <React.Fragment key={dataKey}>
                <div className="ReactVirtualized__Table__headerTruncatedText">{label}</div>
                {!isLastColumn && (
                    <Draggable
                        axis="x"
                        defaultClassName="DragHandle"
                        defaultClassNameDragging="DragHandleActive"
                        onDrag={(e, { deltaX }) =>
                            this.resizeRow({
                                deltaX,
                                headerIndex,
                            })
                        }
                        position={{ x: 0 }}
                        zIndex={999}
                    >
                        <span className="DragHandleIcon" />
                    </Draggable>
                )}
            </React.Fragment>
        );
    };

    resizeRow = ({ deltaX, headerIndex }) => {
        const updatedWidths = {};
        Object.keys(this.state.widths).forEach((key, index) => {
            const width = this.state.widths[key];
            if (headerIndex === index) {
                updatedWidths[key] = width + deltaX;
            } else {
                updatedWidths[key] = width;
            }
        });
        this.setState({ widths: updatedWidths });
    };

    cellRenderer = ({ cellData, dataKey }) => {
        if (dataKey === 'profit') return <ProfitColor value={cellData} />;
        if (dataKey === 'contract_status') return <StatusFormat value={cellData} />;
        return <div>{cellData}</div>;
    };

    render() {
        const { accountID } = this.props;
        const rows = accountID in this.state ? this.state[accountID].rows : [];
        const { widths } = this.state;

        return (
            <div>
                <Table
                    width={this.total_width}
                    height={this.min_height}
                    headerHeight={this.row_height}
                    rowHeight={this.row_height}
                    rowCount={rows.length}
                    rowGetter={this.rowGetter}
                    headerStyle={{
                        fontSize: 11,
                        textTransform: 'capitalize',
                    }}
                >
                    {this.columns.map(({ label, key }, index) => (
                        <Column
                            headerRenderer={this.headerRenderer}
                            cellRenderer={this.cellRenderer}
                            width={widths[key] * this.total_width}
                            key={index}
                            label={label}
                            dataKey={key}
                        />
                    ))}
                </Table>
            </div>
        );
    }
}
