/* eslint-disable no-await-in-loop */
import { Parser } from 'json2csv';
import React from 'react';
import Draggable from 'react-draggable';
import { Table, Column } from 'react-virtualized';
import { observer as global_observer } from '../../../common/utils/observer';
import { appendRow, updateRow, saveAs, isNumber } from '../shared';
import { translate } from '../../../common/i18n';
import { roundBalance } from '../../common/tools';
import * as style from '../style';

const getProfit = ({ sell_price, buy_price, currency }) => {
    if (isNumber(sell_price) && isNumber(buy_price)) {
        return roundBalance({
            currency,
            balance: Number(sell_price) - Number(buy_price),
        });
    }
    return '';
};

const getTimestamp = date => {
    const buy_date = new Date(date * 1000);
    return `${buy_date.toISOString().split('T')[0]} ${buy_date.toTimeString().slice(0, 8)} ${
        buy_date.toTimeString().split(' ')[1]
    }`;
};

const ProfitColor = ({ value }) => <div style={value > 0 ? style.greenLeft : style.redLeft}>{value}</div>;
const StatusFormat = ({ value }) => <div style={style.left}>{value}</div>;

const TradeTable = ({ account_id, api }) => {
    const initial_state = { id: 0, rows: [] };
    const [account_state, setAccountState] = React.useState({ [account_id]: initial_state });

    const actual_account_state_ref = React.useRef(account_state);
    actual_account_state_ref.current = account_state;

    const rows = account_id in account_state ? account_state[account_id].rows : [];

    const total_width = 750;
    const min_height = 290;
    const row_height = 25;

    const columns = [
        { key: 'timestamp', label: translate('Timestamp'), width: 196 },
        { key: 'reference', label: translate('Reference'), width: 88 },
        { key: 'contract_type', label: translate('Trade type'), width: 70 },
        { key: 'entry_tick', label: translate('Entry spot'), width: 71 },
        { key: 'exit_tick', label: translate('Exit spot'), width: 71 },
        { key: 'buy_price', label: translate('Buy price'), width: 84 },
        { key: 'profit', label: translate('Profit/Loss'), width: 89 },
        { key: 'contract_status', label: translate('Status'), width: 73 },
    ];

    const getTradeObject = contract => {
        const trade_obj = {
            ...contract,
            reference: contract.transaction_ids.buy,
            buy_price: roundBalance({ balance: contract.buy_price, currency: contract.currency }),
            timestamp: getTimestamp(contract.date_start),
        };
        if (contract.entry_tick) {
            trade_obj.entry_tick = contract.entry_spot_display_value;
        }
        if (contract.exit_tick) {
            trade_obj.exit_tick = contract.exit_tick_display_value;
        }
        return trade_obj;
    };

    const exportSummary = () => {
        if (account_state[account_id]?.rows?.length > 0) data_export();
    };

    const clearBot = () => {
        setAccountState({ [account_id]: { ...initial_state } });
        global_observer.emit('summary.disable_clear');
    };

    const stopBot = () => {
        if (account_state[account_id]?.rows?.length > 0) global_observer.emit('summary.enable_clear');
    };

    const contractBot = contract => {
        if (!contract) return;
        const trade_obj = getTradeObject(contract);
        const trade = {
            ...trade_obj,
            profit: getProfit(trade_obj),
            contract_status: translate('Pending'),
            contract_settled: false,
        };
        const trade_obj_account_id = trade_obj.accountID;
        const account_state_by_id = getAccountStateById(trade_obj_account_id);
        const trade_obj_state_rows = account_state_by_id.rows;
        const prev_row_index = trade_obj_state_rows.findIndex(t => t.reference === trade.reference);
        if (trade.is_expired && trade.is_sold && !trade.exit_tick) {
            trade.exit_tick = '-';
        }
        if (prev_row_index >= 0) {
            setAccountState({ [trade_obj_account_id]: updateRow(prev_row_index, trade, account_state_by_id) });
        } else {
            setAccountState({ [trade_obj_account_id]: appendRow(trade, account_state_by_id) });
        }
    };

    const settledContract = async ({ contract_id }) => {
        let settled = false;
        let delay = 3000;
        const sleep = () => new Promise(resolve => setTimeout(() => resolve(), delay));

        while (!settled) {
            await sleep();
            try {
                await refreshContract(api, contract_id);
                const rows = account_state[account_id].rows; //eslint-disable-line
                const contract_row = rows.find(row => row.contract_id === contract_id); //eslint-disable-line
                if (contract_row && contract_row.contract_settled) {
                    settled = true;
                }
            } catch (e) {
                // Do nothing. Loop again.
            } finally {
                delay *= 1.5;
            }
        }
    };

    const refreshContract = async (_api, contract_id) => {
        const contract_info = await _api.send({ proposal_open_contract: 1, contract_id });
        const contract = contract_info.proposal_open_contract;
        const trade_obj = getTradeObject(contract);
        const trade = {
            ...trade_obj,
            profit: getProfit(trade_obj),
        };
        if (trade.is_expired && trade.is_sold && !trade.exit_tick) {
            trade.exit_tick = '-';
        }

        const actual_rows = actual_account_state_ref.current[account_id].rows;
        const updated_rows = actual_rows.map(row => {
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
        setAccountState({ [account_id]: { rows: updated_rows } });
    };

    React.useEffect(() => {
        global_observer.register('summary.export', exportSummary);
        global_observer.register('summary.clear', clearBot);
        global_observer.register('bot.stop', stopBot);
        global_observer.register('bot.contract', contractBot);
        global_observer.register('contract.settled', settledContract);

        return () => {
            global_observer.unregister('summary.export', exportSummary);
            global_observer.unregister('summary.clear', clearBot);
            global_observer.unregister('bot.stop', stopBot);
            global_observer.unregister('bot.contract', contractBot);
            global_observer.unregister('contract.settled', settledContract);
        };
    }, [account_state]);

    const rowGetter = ({ index }) => {
        const got_rows = account_state[account_id].rows;
        return got_rows[got_rows.length - 1 - index];
    };

    const data_export = () => {
        const to_data_rows = account_state[account_id].rows.map((item, index) => {
            const to_data_row = item;
            to_data_row.id = index + 1;
            return to_data_row;
        });

        const json2csvParser = new Parser({ fields: [
            'id',
            'timestamp',
            'reference',
            'contract_type',
            'entry_tick',
            'exit_tick',
            'buy_price',
            'sell_price',
            'profit',
        ] });
        const data = json2csvParser.parse(to_data_rows);

        saveAs({ data, filename: 'logs.csv', type: 'text/csv;charset=utf-8' });
    };

    const getAccountStateById = _account_id => {
        if (account_id in account_state) return account_state[account_id];
        setAccountState({ [_account_id]: { ...initial_state } });
        return initial_state;
    };

    const headerRenderer = ({ dataKey, label }) => {
        const headerIndex = columns.findIndex(col => col.key === dataKey);
        const isLastColumn = headerIndex + 1 === columns.length;

        return (
            <React.Fragment key={dataKey}>
                <div className="ReactVirtualized__Table__headerTruncatedText">{label}</div>
                {!isLastColumn && (
                    <Draggable
                        axis="x"
                        defaultClassName="DragHandle"
                        defaultClassNameDragging="DragHandleActive"
                        position={{ x: 0 }}
                        zIndex={999}
                    >
                        <span className="DragHandleIcon" />
                    </Draggable>
                )}
            </React.Fragment>
        );
    };

    const cellRenderer = ({ cellData, dataKey }) => {
        if (dataKey === 'profit') return <ProfitColor value={cellData} />;
        if (dataKey === 'contract_status') return <StatusFormat value={cellData} />;
        return <div>{cellData}</div>;
    };

    return (
        <div>
            <Table
                width={total_width}
                height={min_height}
                headerHeight={row_height}
                rowHeight={row_height}
                rowCount={rows.length}
                rowGetter={rowGetter}
                headerStyle={{
                    fontSize: 11,
                    textTransform: 'capitalize',
                }}
            >
                {columns.map(({ label, key, width }, index) => (
                    <Column
                        headerRenderer={headerRenderer}
                        cellRenderer={cellRenderer}
                        width={width}
                        key={index}
                        label={label}
                        dataKey={key}
                    />
                ))}
            </Table>
        </div>
    );
};

export default TradeTable;
