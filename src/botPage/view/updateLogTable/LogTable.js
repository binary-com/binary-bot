import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { translate } from '../../../common/i18n';
import { appendRow } from '../shared';

const minHeight = 600;

class ColorFormatter extends Component {
    render() {
        return <div className={this.props.row.type}><ReactDataGrid.Row ref="row" {...this.props} /></div>;
    }
}

export default class LogTable extends Component {
    static propTypes = {
        log: PropTypes.shape({
            type     : PropTypes.string,
            timestamp: PropTypes.string,
            message  : PropTypes.string,
        }).isRequired,
    };
    constructor() {
        super();
        this.state = {
            id  : 0,
            rows: [],
        };
        this.columns = [
            { key: 'timestamp', width: 150, name: translate('Timestamp') },
            { key: 'message', resizable: true, name: translate('Message') },
        ];
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.rows.length !== this.state.rows.length) {
            const $tableScroll = $('.logTable-scroll');
            $tableScroll.scrollTop($tableScroll.scrollHeight);
        }
    }
    componentWillReceiveProps(nextProps) {
        const { log } = nextProps;
        if (!Object.keys(log).length) {
            return;
        }
        this.setState(appendRow(log, this.state));
    }
    rowGetter(i) {
        return this.state.rows[i];
    }
    render() {
        if (!$('#logTable:visible').length) {
            return <div style={{ height: minHeight }} />;
        }
        return (
            <ReactDataGrid
                columns={this.columns}
                rowGetter={this.rowGetter.bind(this)}
                rowsCount={this.state.rows.length}
                minHeight={minHeight}
                rowRenderer={ColorFormatter}
            />
        );
    }
}
