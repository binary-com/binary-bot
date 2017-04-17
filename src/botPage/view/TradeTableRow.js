import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TradeRow extends PureComponent {
  static propTypes = {
    trade: PropTypes.shape({
      id: PropTypes.string,
      reference: PropTypes.string,
      contract_type: PropTypes.string,
      entry_tick: PropTypes.string,
      exit_tick: PropTypes.string,
      buy_price: PropTypes.string,
      sell_price: PropTypes.string,
    }).isRequired,
  };
  render() {
    const { sell_price: sellPrice, buy_price: buyPrice } = this.props.trade;

    const profit = Number(Number(sellPrice) - Number(buyPrice)).toFixed(2);

    const profitStyle = {
      color: profit > 0 ? 'green' : 'red',
    };

    return (
      <tr>
        <td> {this.props.trade.id} </td>
        <td> {this.props.trade.reference} </td>
        <td> {this.props.trade.contract_type} </td>
        <td> {this.props.trade.entry_tick} </td>
        <td> {this.props.trade.exit_tick} </td>
        <td> {this.props.trade.buy_price} </td>
        <td> {this.props.trade.sell_price} </td>
        <td style={profitStyle}> {sellPrice ? profit : ''} </td>
      </tr>
    );
  }
}
