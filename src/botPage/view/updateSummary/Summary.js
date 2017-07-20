import React, { Component } from 'react';
import { translate } from '../../../common/i18n';

export default class Summary extends Component {
    componentWillReceiveProps({ tradeInfo }) {
        this.setState({ ...this.state, ...tradeInfo });
    }
    constructor() {
        super();
        this.state = {};
    }
    render() {
        const { totalRuns, totalStake, totalPayout, totalWins, totalLosses, totalProfit, balance } = this.state;

        const profitColor = {
            color: totalProfit > 0 ? 'green' : 'red',
        };
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            {translate('No. of runs')}
                        </th>
                        <th>
                            {translate('Total stake')}
                        </th>
                        <th>
                            {translate('Total payout')}
                        </th>
                        <th>
                            {translate('Win')}
                        </th>
                        <th>
                            {translate('Loss')}
                        </th>
                        <th>
                            {translate('Total profit/loss')}
                        </th>
                        <th>
                            {translate('Balance')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="totalRuns">
                            {totalRuns}
                        </td>
                        <td className="totalStake">
                            {totalStake}
                        </td>
                        <td className="totalPayout">
                            {totalPayout}
                        </td>
                        <td style={{ color: 'green' }} className="totalWins">
                            {totalWins}
                        </td>
                        <td style={{ color: 'red' }} className="totalLosses">
                            {totalLosses}
                        </td>
                        <td style={profitColor} className="totalProfit">
                            {totalProfit}
                        </td>
                        <td className="balance">
                            {balance}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
