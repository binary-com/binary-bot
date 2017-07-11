import { doUntilDone } from '../tools';
import { contract as broadcastContract } from '../broadcast';
import { sell, openContractReceived } from './state/actions';

const SUBSCRIPTION_TIMEOUT = 60; // seconds;
const WAIT_AFTER_FINISH_TIMEOUT = 5;

export default Engine =>
    class OpenContract extends Engine {
        observeOpenContract() {
            this.listen('proposal_open_contract', r => {
                const contract = r.proposal_open_contract;

                if (!this.expectedContractId(contract.contract_id)) {
                    return;
                }

                this.setContractFlags(contract);

                this.sellExpired();

                this.data = this.data.set('contract', contract);

                broadcastContract(contract);

                if (this.isSold) {
                    this.contractId = '';
                    this.updateTotals(contract);
                    if (this.afterPromise) {
                        this.afterPromise();
                    }

                    this.store.dispatch(sell());

                    this.unsubscribeOpenContract();

                    this.cancelSubscriptionTimeout();
                } else {
                    this.store.dispatch(openContractReceived());
                    this.resetSubscriptionTimeout();
                }
            });
        }
        waitForAfter() {
            return new Promise(resolve => {
                this.afterPromise = resolve;
            });
        }
        subscribeToOpenContract(contractId = this.contractId) {
            this.contractId = contractId;

            this.unsubscribeOpenContract();

            doUntilDone(() => this.api.subscribeToOpenContract(contractId)).then(r => {
                ({ proposal_open_contract: { id: this.openContractId } } = r);
            });

            this.resetSubscriptionTimeout();
        }
        resetSubscriptionTimeout() {
            this.cancelSubscriptionTimeout();
            const timeout = this.getContractDuration() || SUBSCRIPTION_TIMEOUT;
            this.subscriptionTimeout = setInterval(() => {
                this.subscribeToOpenContract();
            }, (timeout + WAIT_AFTER_FINISH_TIMEOUT) * 1000);
        }
        cancelSubscriptionTimeout() {
            clearTimeout(this.subscriptionTimeout);
        }
        unsubscribeOpenContract() {
            if (this.openContractId) {
                this.api.unsubscribeByID(this.openContractId);
            }
        }
        setContractFlags(contract) {
            const { is_expired: isExpired, is_valid_to_sell: isValidToSell, is_sold: isSold } = contract;

            this.isSold = Boolean(isSold);

            this.isSellAvailable = !this.isSold && Boolean(isValidToSell);

            this.isExpired = Boolean(isExpired);
        }
        expectedContractId(contractId) {
            return this.contractId && contractId === this.contractId;
        }
    };
