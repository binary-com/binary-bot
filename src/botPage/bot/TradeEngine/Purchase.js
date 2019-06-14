import { translate } from '../../../common/i18n';
import { recoverFromError, doUntilDone } from '../tools';
import { contractStatus, info, notify } from '../broadcast';
import { purchaseSuccessful } from './state/actions';
import { BEFORE_PURCHASE } from './state/constants';

let delayIndex = 0;

export default Engine =>
    class Purchase extends Engine {
        purchase(contractType) {
            // Prevent calling purchase twice
            if (this.store.getState().scope !== BEFORE_PURCHASE) {
                return Promise.resolve();
            }

            const { currency, proposal } = this.selectProposal(contractType);
            const onSuccess = r => {
                const { buy } = r;

                contractStatus({
                    id  : 'contract.purchase_recieved',
                    data: buy.transaction_id,
                    proposal,
                    currency,
                });

                this.subscribeToOpenContract(buy.contract_id);
                this.store.dispatch(purchaseSuccessful());
                this.renewProposalsOnPurchase();

                delayIndex = 0;

                notify('info', `${translate('Bought')}: ${buy.longcode} (${translate('ID')}: ${buy.transaction_id})`);

                info({
                    accountID      : this.accountInfo.loginid,
                    totalRuns      : this.updateAndReturnTotalRuns(),
                    transaction_ids: { buy: buy.transaction_id },
                    contract_type  : contractType,
                    buy_price      : buy.buy_price,
                });
            };

            this.isSold = false;

            contractStatus({
                id  : 'contract.purchase_sent',
                data: proposal.ask_price,
                proposal,
                currency,
            });

            const action = () => this.api.buyContract(proposal.id, proposal.ask_price);

            if (!this.options.timeMachineEnabled) {
                return doUntilDone(action).then(onSuccess);
            }

            return recoverFromError(
                action,
                (errorCode, makeDelay) => {
                    // if disconnected no need to resubscription (handled by live-api)
                    if (errorCode !== 'DisconnectError') {
                        this.renewProposalsOnPurchase();
                    } else {
                        this.clearProposals();
                    }

                    const unsubscribe = this.store.subscribe(() => {
                        const { scope, proposalsReady } = this.store.getState();
                        if (scope === BEFORE_PURCHASE && proposalsReady) {
                            makeDelay().then(() => this.observer.emit('REVERT', 'before'));
                            unsubscribe();
                        }
                    });
                },
                ['PriceMoved', 'InvalidContractProposal'],
                delayIndex++
            ).then(onSuccess);
        }
    };
