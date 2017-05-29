import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { translate } from '../../../../common/i18n';
import LogTableRow from './LogTableRow';

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
            rows: new List(),
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.rows.size !== this.state.rows.size) {
            const $tableScroll = $('.logTable-scroll');
            $tableScroll.scrollTop($tableScroll.scrollHeight);
        }
    }
    componentWillReceiveProps(nextProps) {
        const appendRow = log =>
            this.setState({
                id  : this.state.id + 1,
                rows: this.state.rows.push({
                    ...log,
                    id: this.state.id + 1,
                }),
            });

        const updateRow = (prevRowIndex, log) =>
            this.setState({
                rows: this.state.rows.update(prevRowIndex, () => ({
                    ...log,
                    id: this.state.id,
                })),
            });

        const { log } = nextProps;
        const prevRowIndex = this.state.rows.findIndex(t => t.id === log.id);
        if (prevRowIndex >= 0) {
            updateRow(prevRowIndex, log);
        } else {
            appendRow(log);
        }
    }
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th><span />{translate('Timestamp')}</th>
                        <th><span />{translate('Message')}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.rows.map(r => <LogTableRow key={r.id} log={r.log} />)}
                </tbody>
            </table>
        );
    }
}
