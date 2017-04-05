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
    return this.requestProposals()
  }
  requestProposals() {
    return new Promise(resolve =>
      Promise.all(this.proposalTemplates.map(proposal =>
        doUntilDone(() => this.api.subscribeToPriceForContractProposal({
          ...proposal,
          passthrough: {
            contractType: proposal.contract_type,
          },
        })))).then(resolve).catch(e => this.broadcastError(e)))
  }
  observeProposals() {
    this.listen('proposal', r => {
      const proposal = r.proposal
      const id = proposal.id

      if (!this.data.hasIn(['forgetProposals', id])) {
        this.data = this.data.setIn(['proposals', id],
          { ...proposal, ...r.passthrough })
      }
    })
  }
  unsubscribeProposals() {
    if (!this.data.has('proposals')) {
      return
    }

    const proposals = this.data.get('proposals')

    this.data = this.data.set('proposals', new Map())

    proposals.forEach(proposal => {
      const { id } = proposal

      this.data = this.data.setIn(['forgetProposals', id], true)

      doUntilDone(() => this.api.unsubscribeByID(id)).then(() => {
        this.data = this.data.deleteIn(['forgetProposals', id])
      })
    })
  }
  checkProposalReady() {
    const proposals = this.data.get('proposals')

    return proposals && proposals.size === this.proposalTemplates.length
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
