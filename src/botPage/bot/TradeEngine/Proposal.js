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
                        const { error } = proposal.error;
                        throw new TrackJSError(error.error.code, error.error.message, error);
                    } else {
                        toBuy = proposal;
                    }
                }
            });

            if (!toBuy) {
                throw new TrackJSError(
                    'CustomInvalidProposal',
                    translate('Selected proposal does not exist'),
                    Array.from(this.data.get('proposals')).map(proposal => proposal[1])
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
            this.data = this.data.set('proposals', new Map());
            this.store.dispatch(clearProposals());
        }
        requestProposals() {
            Promise.all(
                this.proposalTemplates.map(proposal =>
                    doUntilDone(() =>
                        this.api.subscribeToPriceForContractProposal(proposal).catch(e => {
                            if (e && e.name === 'RateLimit') {
                                return Promise.reject(e);
                            }

                            const errorCode = e.error && e.error.error && e.error.error.code;

                            if (errorCode === 'ContractBuyValidationError') {
                                const { uuid } = e.error.echo_req.passthrough;

                                if (!this.data.hasIn(['forgetProposals', uuid])) {
                                    // Add to proposals map with error. Will later be shown to user, see selectProposal.
                                    this.data = this.data.setIn(['proposals', uuid], {
                                        ...proposal,
                                        ...proposal.passthrough,
                                        error: e,
                                    });
                                }

                                return null;
                            }

                            return e;
                        })
                    )
                )
            ).catch(e => this.$scope.observer.emit('Error', e));
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
                    const removeProposal = () => {
                        this.data = this.data.deleteIn(['forgetProposals', id]);
                    };

                    this.data = this.data.setIn(['forgetProposals', id], true);

                    if (proposal.error) {
                        removeProposal();
                        return Promise.resolve();
                    }

                    return doUntilDone(() => this.api.unsubscribeByID(proposal.id)).then(() => removeProposal());
                })
            );
        }
        checkProposalReady() {
            const proposals = this.data.get('proposals');

            if (proposals && proposals.size) {
                const isSameWithTemplate = this.proposalTemplates.every(p =>
                    this.data.hasIn(['proposals', p.passthrough.uuid])
                );

                if (isSameWithTemplate) {
                    this.startPromise.then(() => this.store.dispatch(proposalsReady()));
                }
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
                isNotEqual('duration_unit') ||
                isNotEqual('amount') ||
                isNotEqual('prediction') ||
                isNotEqual('barrierOffset') ||
                isNotEqual('secondBarrierOffset') ||
                isNotEqual('symbol')
            );
        }
    };
