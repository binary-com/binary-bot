import json2csv from 'json2csv';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { observer as globalObserver } from '../../common/utils/observer';
import { translate } from '../../common/i18n';
import { appendRow, saveAs } from './shared';

const minHeight = 550;

class ColorFormatter extends Component {
    render() {
        return (
            <div className={this.props.row.type}>
                <ReactDataGrid.Row ref="row" {...this.props} />
            </div>
        );
    }
}

export default class LogTable extends Component {
    static propTypes = {
        log: PropTypes.shape({
            type     : PropTypes.string,
            timestamp: PropTypes.string,
            message  : PropTypes.string,
        }),
    };
    constructor() {
        super();
        this.state = {
            id  : 0,
            rows: [],
        };
        this.columns = [
            { key: 'timestamp', width: 150, resizable: true, name: translate('Timestamp') },
            { key: 'message', resizable: true, width: 1000, name: translate('Message') },
        ];
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.rows.length !== this.state.rows.length) {
            const $tableScroll = $('.logTable-scroll');
            $tableScroll.scrollTop($tableScroll.scrollHeight);
        }
    }
    componentWillMount() {
        globalObserver.register('log.export', () => {
            this.export();
        });

        globalObserver.register('bot.notify', log => {
            if (log) {
                if (!Object.keys(log).length) {
                    return;
                }
                this.setState(appendRow(log, this.state));
            }
        });
    }
    rowGetter(i) {
        return this.state.rows[i];
    }
    export() {
        const data = json2csv({ data: this.state.rows, fields: ['timestamp', 'message'] });
        saveAs({ data, filename: 'logs.csv', type: 'text/csv;charset=utf-8' });
    }
    render() {
        return (
            <div style={{ height: minHeight }}>
                <ReactDataGrid
                    columns={this.columns}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={this.state.rows.length}
                    minHeight={minHeight}
                    rowRenderer={ColorFormatter}
                />
            </div>
        );
    }
}
