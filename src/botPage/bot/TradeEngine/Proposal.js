import { translate } from '../../../common/i18n';
import { tradeOptionToProposal, doUntilDone } from '../tools';
import { proposalsReady, clearProposals } from './state/actions';
import { TrackJSError } from '../../view/logger';

export default Engine =>
    class Proposal extends Engine {
        makeProposals(tradeOption) {
            if (!this.isNewTradeOption(tradeOption)) {
                return;
            }

            // Generate a purchase reference when trade options are different from previous trade options.
            // This will ensure the bot doesn't mistakenly purchase the wrong proposal.
            this.regeneratePurchaseReference();
            this.tradeOption = tradeOption;
            this.proposalTemplates = tradeOptionToProposal(tradeOption, this.getPurchaseReference());
            this.renewProposalsOnPurchase();
        }
        selectProposal(contractType) {
            const { proposals } = this.data;

            if (proposals.length === 0) {
                throw Error(translate('Proposals are not ready'));
            }

            const toBuy = proposals.find(proposal => {
                if (
                    proposal.contractType === contractType &&
                    proposal.purchaseReference === this.getPurchaseReference()
                ) {
                    if (proposal.error) {
                        const { error } = proposal.error.error;
                        const { code, message } = error;
                        throw new TrackJSError(code, message, error);
                    }

                    return proposal;
                }

                return false;
            });

            if (!toBuy) {
                throw new TrackJSError(
                    'CustomInvalidProposal',
                    translate('Selected proposal does not exist'),
                    this.data.proposals
                );
            }

            return {
                proposal: toBuy,
                currency: this.tradeOption.currency,
            };
        }
        renewProposalsOnPurchase() {
            this.unsubscribeProposals().then(() => this.requestProposals());
        }
        clearProposals() {
            this.data.proposals = [];
            this.store.dispatch(clearProposals());
        }
        requestProposals() {
            Promise.all(
                this.proposalTemplates.map(proposal =>
                    doUntilDone(() => this.api.subscribeToPriceForContractProposal(proposal))
                )
            ).catch(e => this.$scope.observer.emit('Error', e));
        }
        observeProposals() {
            this.listen('proposal', response => {
                const { passthrough, proposal } = response;

                if (
                    this.data.proposals.findIndex(p => p.id === proposal.id) === -1 &&
                    !this.data.forgetProposals.includes(proposal.id)
                ) {
                    // Add proposals based on the ID returned by the API.
                    this.data.proposals.push({ ...proposal, ...passthrough });
                    this.checkProposalReady();
                }
            });
        }
        unsubscribeProposals() {
            const { proposals } = this.data;
            const removeForgetProposalById = forgetProposalId => {
                this.data.forgetProposals = this.data.forgetProposals.filter(id => id !== forgetProposalId);
            };

            this.clearProposals();

            return Promise.all(
                proposals.map(proposal => {
                    if (!this.data.forgetProposals.includes(proposal.id)) {
                        this.data.forgetProposals.push(proposal.id);
                    }

                    if (proposal.error) {
                        removeForgetProposalById(proposal.id);
                        return Promise.resolve();
                    }

                    return doUntilDone(() => this.api.unsubscribeByID(proposal.id)).then(() =>
                        removeForgetProposalById(proposal.id)
                    );
                })
            );
        }
        checkProposalReady() {
            // Proposals are considered ready when the proposals in our memory match the ones
            // we've requested from the API, we determine this by checking the passthrough of the response.
            const { proposals } = this.data;

            if (proposals.length > 0) {
                const hasEqualLength = proposals.length === this.proposalTemplates.length;
                const hasEqualProposals = () =>
                    this.proposalTemplates.every(
                        template =>
                            proposals.findIndex(
                                proposal =>
                                    proposal.purchaseReference === template.passthrough.purchaseReference &&
                                    proposal.contractType === template.contract_type
                            ) !== -1
                    );

                if (hasEqualLength && hasEqualProposals()) {
                    this.startPromise.then(() => this.store.dispatch(proposalsReady()));
                }
            }
        }
        isNewTradeOption(tradeOption) {
            if (!this.tradeOption) {
                this.tradeOption = tradeOption;
                return true;
            }

            // Compare incoming "tradeOption" argument with "this.tradeOption", if any
            // of the values is different, this is a new tradeOption and new proposals
            // should be generated.
            return [
                'amount',
                'barrierOffset',
                'basis',
                'duration',
                'duration_unit',
                'prediction',
                'secondBarrierOffset',
                'symbol',
            ].some(value => this.tradeOption[value] !== tradeOption[value]);
        }
    };
