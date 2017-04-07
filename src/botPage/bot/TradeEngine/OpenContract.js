import { doUntilDone } from '../tools'

export default Engine => class OpenContract extends Engine {
  observeOpenContract() {
    this.listen('proposal_open_contract', r => {
      const contract = r.proposal_open_contract

      this.setContractFlags(contract)

      this.sellExpired()

      if (this.isSold) {
        this.ongoingPurchase = false
        this.updateTotals(contract)
        this.api.unsubscribeByID(this.openContractId)
      }

      this.data = this.data.set('contract', contract)

      this.broadcastContract(contract)

      if (this.isSold) {
        if (this.afterPromise) {
          this.afterPromise()
        }
        this.signal('after')
      } else {
        this.signal('during')
      }
    })
  }
  waitForAfter() {
    return new Promise(resolve => {
      this.afterPromise = resolve
    })
  }
  subscribeToOpenContract(contractId) {
    this.isSold = false

    this.isSellAvailable = false

    this.isExpired = false

    doUntilDone(() => this.api.subscribeToOpenContract(contractId)).then(r => {
      ({ proposal_open_contract: { id: this.openContractId } } = r)
    })
  }
  setContractFlags(contract) {
    const {
      is_expired: isExpired,
      is_valid_to_sell: isValidToSell,
      is_sold: isSold,
      contract_id: contractId,
    } = contract

    this.isSold = Boolean(isSold)

    this.isSellAvailable = !this.isSold && Boolean(isValidToSell)

    this.isExpired = Boolean(isExpired)

    this.contractId = contractId
  }
}
