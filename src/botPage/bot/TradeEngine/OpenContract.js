import { doUntilDone } from '../tools';
import { contract as broadcastContract } from '../broadcast';
import { sell, openContractReceived } from './state/actions';

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

                    if (this.openContractId) {
                        this.api.unsubscribeByID(this.openContractId);
                    }
                } else {
                    this.store.dispatch(openContractReceived());
                }
            });
            // send request for proposal open contract if above failed within 1 sec
            this.listen('transaction', t => {
                const { contract_id: contractId, action } = t.transaction;

                if (!this.expectedContractId(contractId) || action !== 'sell') {
                    return;
                }

                setTimeout(() => {
                    if (this.expectedContractId(contractId)) {
                        doUntilDone(() => this.api.getContractInfo(this.contractId));
                    }
                }, 1000);
            });
        }
        waitForAfter() {
            return new Promise(resolve => {
                this.afterPromise = resolve;
            });
        }
        subscribeToOpenContract(contractId) {
            this.contractId = contractId;

            if (!this.transactionRequested) {
                this.transactionRequested = true;
                doUntilDone(() => this.api.subscribeToTransactions());
            }

            doUntilDone(() => this.api.subscribeToOpenContract(contractId)).then(
                r => ({ proposal_open_contract: { id: this.openContractId } } = r)
            );
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
