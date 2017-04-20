import { translate } from '../../../common/i18n'
import { tradeOptionToProposal, doUntilDone } from '../tools'

export default Engine => class Proposal extends Engine {
  makeProposals(tradeOption) {
    if (!this.isNewTradeOption(tradeOption)) {
      return
    }
    this.proposalTemplates = tradeOptionToProposal(tradeOption)
    this.renewProposalsOnPurchase()
  }
  selectProposal(contractType) {
    let toBuy

    if (!this.data.has('proposals')) {
      throw translate('Proposals are not ready')
    }

    this.data.get('proposals').forEach(proposal => {
      if (proposal.contractType === contractType) {
        toBuy = proposal
      }
    })

    if (!toBuy) {
      throw translate('Selected proposal does not exist')
    }

    return toBuy
  }
  renewProposalsOnPurchase() {
    this.unsubscribeProposals()
    this.requestProposals()
  }
  requestProposals() {
    this.proposalTemplates.forEach(proposal =>
      doUntilDone(() => this.api.subscribeToPriceForContractProposal({
        ...proposal,
        passthrough: {
          contractType: proposal.contract_type,
        },
      }))
      .catch(e => this.broadcastError(e)))
  }
  observeProposals() {
    this.listen('proposal', r => {
      const proposal = r.proposal
      const id = proposal.id

      this.data = this.data.setIn(['proposals', id],
        { ...proposal, ...r.passthrough })
    })
  }
  unsubscribeProposals() {
    if (!this.data.has('proposals')) {
      return
    }

    this.data.get('proposals').map(proposal =>
      doUntilDone(() => this.api.unsubscribeByID(proposal.id)).then(() => {
        this.data = this.data.deleteIn(['proposals', proposal.id])
      }))
  }
  checkProposalReady() {
    const proposals = this.data.get('proposals')

    return proposals && proposals.size === 2
  }
  isNewTradeOption(tradeOption) {
    if (!this.tradeOption) {
      this.tradeOption = tradeOption
      return true
    }

    const isNotEqual = key => this.tradeOption[key] !== tradeOption[key]

    return (isNotEqual('duration') || isNotEqual('amount') ||
      isNotEqual('prediction') || isNotEqual('barrierOffset') ||
      isNotEqual('secondBarrierOffset'))
  }
}
