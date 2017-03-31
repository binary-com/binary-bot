import { shouldThrowError } from '../tools'

export default Engine => class Purchase extends Engine {
  purchase(contractType) {
    const toBuy = this.selectProposal(contractType)

    this.isPurchaseRequested = true

    return new Promise((resolve, reject) => {
      this.api.buyContract(toBuy.id, toBuy.ask_price).then(r => {
        this.broadcastPurchase(r.buy, contractType)
        this.subscribeToOpenContract(r.buy.contract_id)
        this.renewProposalsOnPurchase()
        this.signal('purchase')
        resolve()
      }).catch(e => {
        if (shouldThrowError(e, ['PriceMoved'])) {
          reject(e)
          return
        }
        this.isPurchaseRequested = false
        this.renewProposalsOnPurchase().then(() => this.observer.emit('REVERT', 'before'))
      })
    })
  }
}
