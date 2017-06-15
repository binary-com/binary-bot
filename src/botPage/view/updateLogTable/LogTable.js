import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../../common/i18n';
import { appendRow } from '../shared';

const ReactDataGrid = require('react-data-grid');

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
            { key: 'timestamp', width: 120, name: translate('Timestamp') },
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
        if (Object.keys(log).length === 0) {
            return;
        }
        this.setState(appendRow(log, this.state));
    }
    rowGetter(i) {
        return this.state.rows[i];
    }
    render() {
        if (!$('#logTable:visible').length) {
            return <div />;
        }
        return (
            <ReactDataGrid
                columns={this.columns}
                rowGetter={this.rowGetter.bind(this)}
                rowsCount={this.state.rows.length}
                minHeight={500}
            />
        );
    }
}
