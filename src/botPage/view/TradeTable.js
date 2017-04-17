import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { translate } from '../../common/i18n';
import TradeTableRow from './TradeTableRow';

export default class TradeTable extends Component {
  static propTypes = {
    trade: PropTypes.shape({
      reference: PropTypes.string,
      contract_type: PropTypes.string,
      entry_tick: PropTypes.string,
      exit_tick: PropTypes.string,
      buy_price: PropTypes.string,
      sell_price: PropTypes.string,
    }),
  };
  static defaultProps = {
    trade: {
      transaction_ids: {
        buy: '',
      },
      contract_type: '',
      entry_tick: '',
      exit_tick: '',
      buy_price: '',
      sell_price: '',
    },
  };
  constructor() {
    super();
    this.state = {
      id: 0,
      rows: new List(),
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.rows.size !== this.state.rows.size) {
      const $tableScroll = $('.table-scroll');
      $tableScroll.scrollTop($tableScroll[0].scrollHeight);
    }
  }
  componentWillReceiveProps(nextProps) {
    const appendRow = trade =>
      this.setState({
        id: this.state.id + 1,
        rows: this.state.rows.push({
          ...trade,
          id: this.state.id + 1,
        }),
      });

    const updateRow = (prevRowIndex, trade) =>
      this.setState({
        rows: this.state.rows.update(prevRowIndex, () => ({
          ...trade,
          id: this.state.id,
        })),
      });

    const { trade } = nextProps;
    const prevRowIndex = this.state.rows.findIndex(
      t => t.reference === trade.reference,
    );
    if (prevRowIndex >= 0) {
      updateRow(prevRowIndex, trade);
    } else {
      appendRow(trade);
    }
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th><span />{translate('Number')}</th>
            <th><span />{translate('Reference')}</th>
            <th><span />{translate('Trade type')}</th>
            <th><span />{translate('Entry spot')}</th>
            <th><span />{translate('Exit spot')}</th>
            <th><span />{translate('Buy price')}</th>
            <th><span />{translate('Final price')}</th>
            <th><span />{translate('Profit/Loss')}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.rows.slice(-50).map(r => <TradeTableRow trade={r} />)}
        </tbody>
      </table>
    );
  }
}
