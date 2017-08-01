import React, { Component } from 'react';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { translate } from '../../../common/i18n';
import * as style from '../style';

export default class Summary extends Component {
    componentWillMount() {
        globalObserver.register('bot.info', info => {
            const { accountID } = info;
            this.setState({ accountID, [accountID]: { ...this.state[accountID], ...info } });
        });
    }
    constructor() {
        super();
        this.state = { accountID: 'initial', initial: {} };
    }
    render() {
        const {
            accountID,
            totalRuns,
            totalStake,
            totalPayout,
            totalWins,
            totalLosses,
            totalProfit,
            balance,
        } = this.state[this.state.accountID];

        const profitColor = {
            color: totalProfit > 0 ? 'green' : 'red',
        };
        return (
            <div>
                <h3>
                    <span>
                        {translate('Summary')}
                    </span>
                </h3>

                <table>
                    <thead>
                        <tr>
                            <th>
                                {translate('Account')}
                            </th>
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
                            <td className="accountID">
                                {accountID}
                            </td>
                            <td className="totalRuns">
                                {totalRuns}
                            </td>
                            <td className="totalStake">
                                {totalStake}
                            </td>
                            <td className="totalPayout">
                                {totalPayout}
                            </td>
                            <td style={style.green} className="totalWins">
                                {totalWins}
                            </td>
                            <td style={style.red} className="totalLosses">
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
            </div>
        );
    }
}
