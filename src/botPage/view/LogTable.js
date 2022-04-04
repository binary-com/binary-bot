import { Parser } from 'json2csv';
import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { observer as globalObserver } from '../../common/utils/observer';
import { translate } from '../../common/i18n';
import { appendRow, saveAs } from './shared';

const ColorFormatter = React.forwardRef((props, ref) => (
    <div className={props.row.type}>
        <ReactDataGrid.Row ref={ref} {...props} />
    </div>
));

const LogTable = () => {
    const [id, setId] = React.useState(0);
    const [rows, setRows] = React.useState([]);

    const columns = [
        { key: 'timestamp', width: 150, resizable: true, name: translate('Timestamp') },
        { key: 'message', resizable: true, width: 640, name: translate('Message') },
    ];
    const min_height = 550;

    React.useEffect(() => {
        globalObserver.register('log.export', exportLogs);
        globalObserver.register('bot.notify', onGetNotification);
        return () => {
            globalObserver.unregister('log.export', exportLogs);
            globalObserver.unregister('bot.notify', onGetNotification);
        };
    }, [rows]);

    const onGetNotification = log => {
        if (!log || !Object.keys(log).length) return;

        const row = appendRow(log, { id, rows });
        setRows(row.rows);
        setId(row.id);
    };

    const exportLogs = () => {
        const json2csvParser = new Parser({
            fields: ['timestamp', 'message'],
        });
        const data = json2csvParser.parse(rows);

        saveAs({ data, filename: 'logs.csv', type: 'text/csv;charset=utf-8' });
    };

    const rowGetter = i => rows[i];

    return (
        <span id="logPanel" className="draggable-dialog" title={translate("Log")}>
            <div id="logTable" className="logTable-scroll">
                <div className="content-row">
                    <div>
                        <div className="content-row-table">
                            <div style={{ height: min_height }}>
                                <ReactDataGrid
                                    columns={columns}
                                    rowGetter={rowGetter}
                                    rowsCount={rows.length}
                                    minHeight={min_height}
                                    rowRenderer={<ColorFormatter />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
};

export default LogTable;
