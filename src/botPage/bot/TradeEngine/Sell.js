import { translate } from '../../../common/i18n';
import { recoverFromError, doUntilDone } from '../tools';
import { contractStatus, notify } from '../broadcast';
import { DURING_PURCHASE } from './state/constants';

let delayIndex = 0;

export default Engine =>
    class Sell extends Engine {
        isSellAtMarketAvailable() {
            return this.contractId && !this.isSold && this.isSellAvailable && !this.isExpired;
        }
        sellAtMarket() {
            // Prevent calling sell twice
            if (this.store.getState().scope !== DURING_PURCHASE) {
                return Promise.resolve();
            }

            if (!this.isSellAtMarketAvailable()) {
                throw Error(translate('Sell is not available'));
            }

            const onSuccess = ({ sell: { sold_for: soldFor } }) => {
                delayIndex = 0;
                contractStatus('purchase.sold');
                notify('info', `${translate('Sold for')}: ${soldFor}`);
                return this.waitForAfter();
            };

            const action = () => this.api.sellContract(this.contractId, 0);

            if (!this.options.timeMachineEnabled) {
                return doUntilDone(action).then(onSuccess);
            }

            return recoverFromError(
                action,
                (errorCode, makeDelay) => makeDelay().then(() => this.observer.emit('REVERT', 'during')),
                ['NoOpenPosition', 'InvalidSellContractProposal', 'UnrecognisedRequest'],
                delayIndex++
            ).then(onSuccess);
        }
        sellExpired() {
            if (this.isSellAvailable && this.isExpired) {
                doUntilDone(() => this.api.sellExpiredContracts());
            }
        }
    };
