export default Engine => class OpenContract extends Engine {
  observeOpenContract() {
    this.listen('proposal_open_contract', r => {
      const contract = r.proposal_open_contract

      this.setContractFlags(contract)

      this.sellExpired()

      if (this.isSold) {
        this.isPurchaseStarted = false
        this.updateTotals(contract)
      }

      this.broadcastContract(contract)

      this.execContext(this.isSold ? 'after' : 'during')
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
