import { tradeOptionToProposal, doUntilDone } from '../tools'

export default Engine => class Proposal extends Engine {
  constructor() {
    super()
    this.anotherProposalExpected = false
  }
  makeProposals(tradeOption) {
    if (!this.isNewTradeOption(tradeOption)) {
      return
    }
    this.proposalTemplates = tradeOptionToProposal(tradeOption)
    this.unsubscribeProposals()
    this.requestProposals()
  }
  selectProposal(contractType) {
    let toBuy

    this.data.get('proposals').forEach(proposal => {
      if (proposal.contractType === contractType) {
        toBuy = proposal
      }
    })

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
      }), ['ContractBuyValidationError']))
  }
  observeProposals() {
    this.listen('proposal', r => {
      const proposal = r.proposal
      const id = proposal.id

      this.anotherProposalExpected = !this.anotherProposalExpected

      this.data = this.data.setIn(['proposals', id],
        { ...r.passthrough, ...proposal })
    })
  }
  unsubscribeProposals() {
    if (!this.data.has('proposals')) {
      return
    }

    this.data.get('proposals').forEach(proposal => {
      doUntilDone(() => this.api.unsubscribeByID(proposal.id))
    })

    this.data = this.data.set('proposals', new Map())
  }
  checkProposalReady() {
    return this.data.has('proposals') && this.data.get('proposals').size &&
      !this.anotherProposalExpected
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
