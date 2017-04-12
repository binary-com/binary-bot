import { doUntilDone } from '../tools'

export default Engine => class OpenContract extends Engine {
  observeOpenContract() {
    this.listen('proposal_open_contract', r => {
      const contract = r.proposal_open_contract

      if (this.contractId !== contract.contract_id) {
        return
      }

      this.setContractFlags(contract)

      this.sellExpired()

      this.data = this.data.set('contract', contract)

      this.broadcastContract(contract)

      if (this.isSold) {
        this.ongoingPurchase = false
        this.contractId = ''
        this.updateTotals(contract)
        this.api.unsubscribeByID(this.openContractId)
        if (this.afterPromise) {
          this.afterPromise()
        }

        this.signal('after')
      } else {
        this.signal('during')
      }
    })
    this.listen('transaction', t => {
      const { contract_id: contractId, action } = t.transaction

      if (contractId !== this.contractId || action !== 'sell') {
        return
      }

      doUntilDone(() => this.api.getContractInfo(this.contractId))
    })
  }
  waitForAfter() {
    return new Promise(resolve => {
      this.afterPromise = resolve
    })
  }
  subscribeToOpenContract(contractId) {
    this.contractId = contractId

    if (!this.transactionRequested) {
      this.transactionRequested = true
      doUntilDone(() => this.api.subscribeToTransactions())
    }

    doUntilDone(() => this.api.subscribeToOpenContract(contractId)).then(r => {
      ({ proposal_open_contract: { id: this.openContractId } } = r)
    })
  }
  setContractFlags(contract) {
    const {
      is_expired: isExpired,
      is_valid_to_sell: isValidToSell,
      is_sold: isSold,
    } = contract

    this.isSold = Boolean(isSold)

    this.isSellAvailable = !this.isSold && Boolean(isValidToSell)

    this.isExpired = Boolean(isExpired)
  }
}
