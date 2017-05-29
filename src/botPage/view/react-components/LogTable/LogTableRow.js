import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class LogTableRow extends PureComponent {
    static propTypes = {
        log: PropTypes.shape({
            id       : PropTypes.number,
            type     : PropTypes.string,
            timestamp: PropTypes.string,
            message  : PropTypes.string,
        }).isRequired,
    };
    render() {
        return (
            <tr className={this.props.log.type}>
                <td> {this.props.log.timestamp} </td>
                <td> {this.props.log.message} </td>
            </tr>
        );
    }
}
