import { shouldThrowError } from '../tools'

export default Engine => class Purchase extends Engine {
  purchase(contractType) {
    const toBuy = this.selectProposal(contractType)

    this.isPurchaseStarted = true

    return new Promise((resolve, reject) => {
      this.api.buyContract(toBuy.id, toBuy.ask_price).then(r => {
        this.broadcastPurchase(r.buy, contractType)
        this.subscribeToOpenContract(r.buy.contract_id)
        this.renewProposalsOnPurchase()
        resolve(true)
      }).catch(e => {
        if (shouldThrowError(e)) {
          reject(e)
          return
        }
        this.isPurchaseStarted = false
        this.waitBeforePurchase().then(() => this.observer.emit('REVERT'))
      })
    })
  }
}
