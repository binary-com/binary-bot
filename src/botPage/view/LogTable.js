import json2csv from 'json2csv';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { Table, Column, CellMeasurerCache } from 'react-virtualized';
import { observer as globalObserver } from '../../common/utils/observer';
import { translate } from '../../common/i18n';
import { appendRow, saveAs } from './shared';

const Logtable = () => {
    const [id, setId] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [widths, setWidths] = React.useState({
        timestamp: 0.25,
        message: 0.75,
    });

    const total_width = 1150;
    const min_height = 550;
    const cache = new CellMeasurerCache({
        defaultHeight: 35,
    });

    const columns = [
        { label: translate('Timestamp'), dataKey: 'timestamp' },
        { label: translate('Message'), dataKey: 'message' },
    ];

    const logtable = React.useRef();

    React.useEffect(() => {
        globalObserver.register('log.export', exportLogs);
        globalObserver.register('bot.notify', notify);
        return () => {
            globalObserver.unregister('log.export', exportLogs);
            globalObserver.unregister('bot.notify', notify);
        };
    }, [rows]);

    const exportLogs = () => {
        const data = json2csv({ data: rows, fields: ['timestamp', 'message'] });
        saveAs({ data, filename: 'logs.csv', type: 'text/csv;charset=utf-8' });
    };

    const notify = log => {
        if (!log) return;
        const { id: updated_id, rows: updated_rows } = appendRow(log, { id, rows });
        setId(updated_id);
        setRows(updated_rows);
        logtable.current.scrollToRow(updated_id);
    };

    const headerRenderer = ({ dataKey, label }) => {
        const index = columns.findIndex(col => col.dataKey === dataKey);
        const is_last_column = index + 1 === columns.length;

        return (
            <React.Fragment key={dataKey}>
                <div className="ReactVirtualized__Table__headerTruncatedText">{label}</div>
                {!is_last_column && (
                    <Draggable
                        axis="x"
                        defaultClassName="DragHandle"
                        defaultClassNameDragging="DragHandleActive"
                        onDrag={(e, { deltaX }) =>
                            resizeRow({
                                dataKey,
                                deltaX,
                            })
                        }
                        position={{ x: 0 }}
                        zIndex={999}
                    >
                        <span className="DragHandleIcon logTable" />
                    </Draggable>
                )}
            </React.Fragment>
        );
    };

    const resizeRow = ({ dataKey, deltaX }) => {
        const prev_widths = { ...widths };
        const percent_delta = deltaX / total_width;

        setWidths({
            message: prev_widths.message - percent_delta,
            timestamp: prev_widths.timestamp + percent_delta,
        });
    };

    const rowRenderer = ({ rowData, columns, className, key }) => (
        <div className={`${className} ${rowData.type}`} key={key}>
            {columns?.map(({ props, key: inner_key }) => (
                <div style={props.style} className={props.className} role={props.role} key={inner_key}>
                    {props.title}
                </div>
            ))}
        </div>
    );

    console.log(logtable);

    return (
        <div className="content-row">
            <div>
                <div className="content-row-table">
                    <div style={{ height: min_height }}>
                        <Table
                            ref={logtable}
                            width={760}
                            height={min_height}
                            headerHeight={35}
                            rowHeight={35}
                            rowCount={rows.length}
                            rowGetter={({ index }) => rows[index]}
                            headerStyle={{
                                fontSize: 11,
                                textTransform: 'capitalize',
                            }}
                            rowRenderer={rowRenderer}
                            deferredMeasurementCache={cache}
                        >
                            {columns.map(({ label, dataKey }, index) => (
                                <Column
                                    key={index}
                                    headerRenderer={headerRenderer}
                                    width={widths[dataKey] * total_width}
                                    label={label}
                                    dataKey={dataKey}
                                />
                            ))}
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logtable;
