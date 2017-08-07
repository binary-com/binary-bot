import { translate } from '../../../common/i18n';
import { roundBalance } from '../../common/tools';
import { info, notify } from '../broadcast';
import createError from '../../common/error';

let totalProfit = 0;
let totalWins = 0;
let totalLosses = 0;
let totalStake = 0;
let totalPayout = 0;
let totalRuns = 0;

export default Engine =>
    class Total extends Engine {
        constructor() {
            super();
            this.sessionRuns = 0;
            this.sessionProfit = 0;
        }
        updateTotals(contract) {
            const { sell_price: sellPrice, buy_price: buyPrice, currency } = contract;

            const profit = roundBalance({ currency, balance: Number(sellPrice) - Number(buyPrice) });

            const win = profit > 0;

            totalWins += win ? 1 : 0;

            totalLosses += !win ? 1 : 0;

            this.sessionProfit = roundBalance({ currency, balance: Number(this.sessionProfit) - Number(profit) });

            totalProfit = roundBalance({ currency, balance: Number(totalProfit) + Number(profit) });
            totalStake = roundBalance({ currency, balance: Number(totalStake) + Number(buyPrice) });
            totalPayout = roundBalance({ currency, balance: Number(totalPayout) + Number(sellPrice) });

            info({
                profit,
                contract,
                totalProfit,
                totalWins,
                totalLosses,
                totalStake,
                totalPayout,
            });

            if (win) {
                notify('success', `${translate('Profit amount')}: ${profit}`);
            } else {
                notify('warn', `${translate('Loss amount')}: ${profit}`);
            }
        }
        updateAndReturnTotalRuns() {
            this.sessionRuns++;
            return ++totalRuns;
        }
        /* eslint-disable class-methods-use-this */
        getTotalRuns() {
            return totalRuns;
        }
        getTotalProfit() {
            return totalProfit;
        }
        /* eslint-enable */
        checkLimits(tradeOption) {
            if (!tradeOption.limitations) {
                return;
            }

            const { limitations: { maxLoss, maxTrades } } = tradeOption;

            if (maxLoss && maxTrades) {
                if (this.sessionRuns >= maxTrades) {
                    throw createError('CustomLimitsReached', translate('Maximum number of trades reached'));
                }
                if (this.sessionProfit <= -maxLoss) {
                    throw createError('CustomLimitsReached', translate('Maximum loss amount reached'));
                }
            }
        }
    };
