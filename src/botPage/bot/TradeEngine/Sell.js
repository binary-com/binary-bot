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
                notify('warn', translate('Resale of this contract is not offered.'));
                return Promise.resolve();
            }

            const onSuccess = soldFor => {
                delayIndex = 0;
                contractStatus('purchase.sold');
                notify('info', `${translate('Sold for')}: ${soldFor}`);
                return this.waitForAfter();
            };

            const action = () =>
                this.api
                    .sellContract(this.contractId, 0)
                    .then(response => {
                        onSuccess(response.sell.sold_for);
                    })
                    .catch(response => {
                        const {
                            error: { error },
                        } = response;
                        if (error.code === 'InvalidOfferings') {
                            // "InvalidOfferings" may occur when user tries to sell the contract too close
                            // to the expiry time. We shouldn't interrupt the bot but instead let the contract
                            // finish.
                            notify('warn', error.message);
                            return Promise.resolve();
                        }
                        // In all other cases, throw a custom error that will stop the bot (after the current contract has finished).
                        // See interpreter for SellNotAvailableCustom.
                        const customError = new Error(error.message);
                        customError.name = 'SellNotAvailableCustom';
                        throw customError;
                    });

            if (!this.options.timeMachineEnabled) {
                return doUntilDone(action);
            }

            return recoverFromError(
                action,
                (errorCode, makeDelay) => makeDelay().then(() => this.observer.emit('REVERT', 'during')),
                ['NoOpenPosition', 'InvalidSellContractProposal', 'UnrecognisedRequest'],
                delayIndex++
            ).then(onSuccess);
        }
    };
