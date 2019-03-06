import { translate } from '../../../common/i18n';
import { tradeOptionToProposal, doUntilDone, getUUID } from '../tools';
import { proposalsReady, clearProposals } from './state/actions';

export default Engine =>
    class Proposal extends Engine {
        makeProposals(tradeOption) {
            if (!this.isNewTradeOption(tradeOption)) {
                return;
            }
            this.tradeOption = tradeOption;
            this.proposalTemplates = tradeOptionToProposal(tradeOption);
            this.renewProposalsOnPurchase();
        }
        selectProposal(contractType) {
            let toBuy;

            if (!this.data.has('proposals')) {
                throw Error(translate('Proposals are not ready'));
            }

            this.data.get('proposals').forEach(proposal => {
                if (proposal.contractType === contractType) {
                    if (proposal.error) {
                        throw Error(proposal.error.error.error.message);
                    } else {
                        toBuy = proposal;
                    }
                }
            });

            if (!toBuy) {
                throw Error(translate('Selected proposal does not exist'));
            }

            return {
                id      : toBuy.id,
                askPrice: toBuy.ask_price,
            };
        }
        renewProposalsOnPurchase() {
            this.unsubscribeProposals().then(() => this.requestProposals());
        }
        clearProposals() {
            this.data = this.data.set('proposals', new Map());
            this.store.dispatch(clearProposals());
        }
        requestProposals() {
            this.proposalTemplates.map(proposal =>
                doUntilDone(() =>
                    this.api
                        .subscribeToPriceForContractProposal({
                            ...proposal,
                            passthrough: {
                                contractType: proposal.contract_type,
                                uuid        : getUUID(),
                            },
                        })
                        .catch(e => {
                            if (e.error.error.code === 'ContractBuyValidationError') {
                                const { uuid } = e.error.echo_req.passthrough;

                                if (!this.data.hasIn(['forgetProposals', uuid])) {
                                    this.data = this.data.setIn(['proposals', uuid], {
                                        ...proposal,
                                        contractType: proposal.contract_type,
                                        error       : e,
                                    });
                                }
                            } else {
                                this.$scope.observer.emit('Error', e);
                            }
                        })
                )
            );
        }
        observeProposals() {
            this.listen('proposal', r => {
                const { proposal, passthrough } = r;
                const id = passthrough.uuid;

                if (!this.data.hasIn(['forgetProposals', id])) {
                    this.data = this.data.setIn(['proposals', id], {
                        ...proposal,
                        ...passthrough,
                    });
                    this.checkProposalReady();
                }
            });
        }
        unsubscribeProposals() {
            const proposalObj = this.data.get('proposals');

            if (!proposalObj) {
                return Promise.resolve();
            }

            const proposals = Array.from(proposalObj.values());

            this.clearProposals();

            return Promise.all(
                proposals.map(proposal => {
                    const { uuid: id } = proposal;
                    const removeProposal = uuid => {
                        this.data = this.data.deleteIn(['forgetProposals', uuid]);
                    };

                    if (proposal.error) {
                        removeProposal(id);
                        return Promise.resolve();
                    }
                    return doUntilDone(() => this.api.unsubscribeByID(proposal.id)).then(() => removeProposal(id));
                })
            );
        }
        checkProposalReady() {
            const proposals = this.data.get('proposals');

            if (proposals && proposals.size === this.proposalTemplates.length) {
                this.startPromise.then(() => this.store.dispatch(proposalsReady()));
            }
        }
        isNewTradeOption(tradeOption) {
            if (!this.tradeOption) {
                this.tradeOption = tradeOption;
                return true;
            }

            const isNotEqual = key => this.tradeOption[key] !== tradeOption[key];

            return (
                isNotEqual('duration') ||
                isNotEqual('amount') ||
                isNotEqual('prediction') ||
                isNotEqual('barrierOffset') ||
                isNotEqual('secondBarrierOffset')
            );
        }
    };
