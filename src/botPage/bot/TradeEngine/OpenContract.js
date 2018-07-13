import { roundBalance } from '../../common/tools';
import { doUntilDone } from '../tools';
import { contractStatus, contract as broadcastContract } from '../broadcast';
import { sell, openContractReceived } from './state/actions';

const AFTER_FINISH_TIMEOUT = 5;

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

                broadcastContract({ accountID: this.accountInfo.loginid, ...contract });

                if (this.isSold) {
                    contractStatus({
                        id  : 'contract.sold',
                        data: contract.transaction_ids.sell,
                    });
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
                    if (!this.isExpired) {
                        this.resetSubscriptionTimeout();
                        return;
                    }
                    if (!this.retriedUnsuccessfullSellExpired) {
                        this.retriedUnsuccessfullSellExpired = true;
                        this.resetSubscriptionTimeout(AFTER_FINISH_TIMEOUT);
                    }
                }
            });
        }
        waitForAfter() {
            return new Promise(resolve => {
                this.afterPromise = resolve;
            });
        }
        subscribeToOpenContract(contractId = this.contractId) {
            if (this.contractId !== contractId) {
                this.retriedUnsuccessfullSellExpired = false;
                this.resetSubscriptionTimeout();
            }
            this.contractId = contractId;

            this.unsubscribeOpenContract();

            doUntilDone(() => this.api.subscribeToOpenContract(contractId)).then(r => {
                ({ proposal_open_contract: { id: this.openContractId } } = r);
            });
        }
        resetSubscriptionTimeout(timeout = this.getContractDuration() + AFTER_FINISH_TIMEOUT) {
            this.cancelSubscriptionTimeout();
            this.subscriptionTimeout = setInterval(() => {
                this.subscribeToOpenContract();
                this.resetSubscriptionTimeout(timeout);
            }, timeout * 1000);
        }
        cancelSubscriptionTimeout() {
            clearTimeout(this.subscriptionTimeout);
        }
        unsubscribeOpenContract() {
            if (this.openContractId) {
                doUntilDone(() => this.api.unsubscribeByID(this.openContractId));
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
        getSellPrice() {
            const { bid_price: bidPrice, buy_price: buyPrice, currency } = this.data.get('contract');
            return Number(roundBalance({ currency, balance: Number(bidPrice) - Number(buyPrice) }));
        }
    };
