import { roundBalance } from '../../common/tools';
import { doUntilDone } from '../tools';
import { contractStatus, contractSettled, contract as broadcastContract } from '../broadcast';
import { sell, openContractReceived } from './state/actions';
import { observer } from '../../../common/utils/observer';

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

                this.data.contract = contract;

                broadcastContract({ accountID: this.accountInfo.loginid, ...contract });

                if (this.isSold) {
                    contractStatus({
                        id  : 'contract.sold',
                        data: contract.transaction_ids.sell,
                        contract,
                    });
                    contractSettled(contract);
                    this.contractId = '';
                    this.updateTotals(contract);
                    if (this.afterPromise) {
                        this.afterPromise();
                    }

                    this.store.dispatch(sell());

                    this.cancelSubscriptionTimeout();
                } else {
                    this.store.dispatch(openContractReceived());
                    if (!this.isExpired) {
                        this.resetSubscriptionTimeout();
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
                this.resetSubscriptionTimeout();
            }
            this.contractId = contractId;

            doUntilDone(() =>
                this.api.subscribeToOpenContract(contractId).then(response => {
                    this.openContractId = response.proposal_open_contract.id;
                })
            ).catch(error => {
                observer.emit('reset_animation');
                observer.emit('Error', error);
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
        setContractFlags(contract) {
            const {
                is_expired: isExpired,
                is_valid_to_sell: isValidToSell,
                is_sold: isSold,
                entry_tick: entryTick,
            } = contract;

            this.isSold = Boolean(isSold);

            this.isSellAvailable = !this.isSold && Boolean(isValidToSell);

            this.isExpired = Boolean(isExpired);

            this.hasEntryTick = Boolean(entryTick);
        }
        expectedContractId(contractId) {
            return this.contractId && contractId === this.contractId;
        }
        getSellPrice() {
            const { bid_price: bidPrice, buy_price: buyPrice, currency } = this.data.contract;
            return Number(roundBalance({ currency, balance: Number(bidPrice) - Number(buyPrice) }));
        }
    };
