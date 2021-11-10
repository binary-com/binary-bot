import json2csv from 'json2csv';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { Table, Column, CellMeasurerCache } from 'react-virtualized';
import { observer as globalObserver } from '../../common/utils/observer';
import { translate } from '../../common/i18n';
import { appendRow, saveAs } from './shared';

const min_height = 550;

export default class LogTable extends Component {
    static propTypes = {
        log: PropTypes.shape({
            type: PropTypes.string,
            timestamp: PropTypes.string,
            message: PropTypes.string,
        }),
    };

    state = {
        id: 0,
        rows: [],
        widths: {
            timestamp: 0.2,
            message: 0.8,
        },
    };
    total_width = 1150;
    cache = new CellMeasurerCache({
        defaultHeight: 35,
    });

    columns = [
        { label: translate('Timestamp'), dataKey: 'timestamp' },
        { label: translate('Message'), dataKey: 'message' },
    ];

    componentWillMount() {
        globalObserver.register('log.export', () => {
            this.export();
        });

        globalObserver.register('bot.notify', log => {
            if (log) {
                if (!Object.keys(log).length) {
                    return;
                }
                this.setState(appendRow(log, this.state), () => {
                    this.logtable.scrollToRow(this.state.id);
                });
            }
        });
    }

    export() {
        const data = json2csv({ data: this.state.rows, fields: ['timestamp', 'message'] });
        saveAs({ data, filename: 'logs.csv', type: 'text/csv;charset=utf-8' });
    }

    headerRenderer = ({ dataKey, label }) => {
        const index = this.columns.findIndex(col => col.dataKey === dataKey);
        const isLastColumn = index + 1 === this.columns.length;

        return (
            <React.Fragment key={dataKey}>
                <div className="ReactVirtualized__Table__headerTruncatedText">{label}</div>
                {!isLastColumn && (
                    <Draggable
                        axis="x"
                        defaultClassName="DragHandle"
                        defaultClassNameDragging="DragHandleActive"
                        onDrag={(event, { deltaX }) =>
                            this.resizeRow({
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

    resizeRow = ({ dataKey, deltaX }) => {
        this.setState(prevState => {
            const prevWidths = prevState.widths;
            const percentDelta = deltaX / this.total_width;
            const nextDataKey = 'timestamp';

            return {
                widths: {
                    ...prevWidths,
                    [dataKey]: prevWidths[dataKey] - percentDelta,
                    [nextDataKey]: prevWidths[nextDataKey] + percentDelta,
                },
            };
        });
    };

    rowRenderer = ({ rowData, columns, className, key }) => (
        <div className={`${className} ${rowData.type}`} key={key}>
            {columns?.map(({ props, key: inner_key }) => (
                <div style={props.style} className={props.className} role={props.role} key={inner_key}>
                    {props.title}
                </div>
            ))}
        </div>
    );

    render() {
        const { widths } = this.state;

        return (
            <div className="content-row">
                <div>
                    <div className="content-row-table">
                        <div style={{ height: min_height }}>
                            <Table
                                ref={ref => (this.logtable = ref)}
                                width={760}
                                height={min_height}
                                headerHeight={35}
                                rowHeight={35}
                                rowCount={this.state.rows.length}
                                rowGetter={({ index }) => this.state.rows[index]}
                                headerStyle={{
                                    fontSize: 11,
                                    textTransform: 'capitalize',
                                }}
                                rowRenderer={this.rowRenderer}
                                deferredMeasurementCache={this.cache}
                            >
                                {this.columns.map(({ label, dataKey }, index) => (
                                    <Column
                                        key={index}
                                        headerRenderer={this.headerRenderer}
                                        width={widths[dataKey] * this.total_width}
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
    }
}
