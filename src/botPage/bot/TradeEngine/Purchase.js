import { translate } from '../../../common/i18n';
import { getUUID, recoverFromError, doUntilDone } from '../tools';
import { contractStatus, info, notify } from '../broadcast';
import { purchaseSuccessful } from './state/actions';
import { BEFORE_PURCHASE } from './state/constants';
import GTM from '../../../common/gtm';

let delayIndex = 0;
let purchaseReference;

export default Engine =>
    class Purchase extends Engine {
        purchase(contractType) {
            // Prevent calling purchase twice
            if (this.store.getState().scope !== BEFORE_PURCHASE) {
                return Promise.resolve();
            }

            const { currency, proposal } = this.selectProposal(contractType);
            const onSuccess = response => {
                // Don't unnecessarily send a forget request for a purchased contract.
                this.data.proposals = this.data.proposals.filter(p => p.id !== response.echo_req.buy);
                const { buy } = response;
                GTM.pushDataLayer({ event: 'bot_purchase', buy_price: proposal.ask_price });

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
        getPurchaseReference = () => purchaseReference;
        regeneratePurchaseReference = () => {
            purchaseReference = getUUID();
        };
    };
