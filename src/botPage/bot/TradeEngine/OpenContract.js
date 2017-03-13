export default Engine => class OpenContract extends Engine {
  isSellAtMarketAvailable() {
    return !this.isSold && this.isSellAvailable && !this.isExpired
  }
  sellAtMarket() {
    if (this.isSellAtMarketAvailable()) {
      this.api.sellContract(this.contractId, 0).then(() => {
        this.isSellAvailable = false
      }).catch(() => this.sellAtMarket())
    }
  }
  sellExpired() {
    if (this.isSellAvailable && this.isExpired) {
      this.api.sellExpiredContracts()
    }
  }
  observeOpenContract() {
    this.listen('proposal_open_contract', r => {
      const contract = r.proposal_open_contract

      this.setContractFlags(contract)

      this.sellExpired()

      if (this.isSold) {
        this.isPurchaseStarted = false
        this.updateTotals(contract)
        this.api.unsubscribeByID(this.openContractId)
      }

      this.data = this.data.set('contract', contract)

      this.broadcastContract(contract)

      this.signal(this.isSold ? 'after' : 'during')
    })
  }
  subscribeToOpenContract(contractId) {
    this.api.subscribeToOpenContract(contractId).then(r => {
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

    this.isSellAvailable = !isSold && Boolean(isValidToSell)

    this.isExpired = Boolean(isExpired)

    this.contractId = contractId
  }
}
