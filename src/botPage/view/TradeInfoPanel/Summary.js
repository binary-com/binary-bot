import React from 'react';
import { observer as globalObserver } from '../../../common/utils/observer';
import { translate } from '../../../common/i18n';
import * as style from '../style';

const Summary = ({ accountID }) => {
    const [summary_info, setSummaryInfo] = React.useState({});
    const { totalRuns, totalStake, totalPayout, totalWins, totalLosses, totalProfit, balance } = summary_info;
    const profit_color = {
        color: totalProfit > 0 ? 'green' : 'red',
    };

    React.useEffect(() => {
        const updateSummary = info => setSummaryInfo({ ...summary_info, ...info });
        const clearSummary = () => setSummaryInfo({});

        globalObserver.register('bot.info', updateSummary);
        globalObserver.register('summary.clear', clearSummary);

        return () => {
            globalObserver.unregister('bot.info', updateSummary);
            globalObserver.unregister('summary.clear', clearSummary);
        };
    }, [summary_info]);

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
                    <td style={profit_color} className="totalProfit">
                        {totalProfit}
                    </td>
                    <td className="balance">{balance?.includes('UST') ? balance.replace('UST', 'USDT') : balance}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default Summary;
