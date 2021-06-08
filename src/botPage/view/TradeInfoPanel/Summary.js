import React, { Component } from 'react';
import { observer as globalObserver } from '../../../common/utils/observer';
import { translate } from '../../../common/i18n';
import * as style from '../style';

export default class Summary extends Component {
    constructor({ accountID }) {
        super();
        this.state = { [accountID]: {} };
    }
    componentWillMount() {
        globalObserver.register('bot.info', info => {
            const { accountID } = info;
            this.setState({ [accountID]: { ...this.state[accountID], ...info } });
        });
        globalObserver.register('summary.clear', () => {
            const { accountID } = this.props;
            this.setState({ [accountID]: {} });
        });
    }
    render() {
        const { accountID } = this.props;

        const { totalRuns, totalStake, totalPayout, totalWins, totalLosses, totalProfit, balance } =
            accountID in this.state ? this.state[accountID] : {};

        const profitColor = {
            color: totalProfit > 0 ? 'green' : 'red',
        };
        return (
            <table>
                <thead>
                    <tr>
                        <th>{translate('Account')}</th>
                        <th>{translate('No. of runs')}</th>
                        <th>{translate('Total stake')}</th>
                        <th>{translate('Total payout')}</th>
                        <th>{translate('Win')}</th>
                        <th>{translate('Loss')}</th>
                        <th>{translate('Total profit/loss')}</th>
                        <th>{translate('Balance')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="accountID">{accountID}</td>
                        <td className="totalRuns">{totalRuns}</td>
                        <td className="totalStake">{totalStake}</td>
                        <td className="totalPayout">{totalPayout}</td>
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
                            {balance?.includes('UST') ? balance?.replace('UST', 'USDT') : balance}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
