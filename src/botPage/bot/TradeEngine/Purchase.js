import { recoverFromError } from '../tools'

let delayIndex = 0

export default Engine => class Purchase extends Engine {
  purchase(contractType) {
    const toBuy = this.selectProposal(contractType)

    this.ongoingPurchase = true

    return recoverFromError(() => this.api.buyContract(toBuy.id, toBuy.ask_price),
      (errorCode, makeDelay) => {
        // if disconnected no need to resubscription (handled by live-api)
        if (errorCode !== 'DisconnectError') {
          this.renewProposalsOnPurchase()
        }

        this.waitForProposals()
          .then(() => makeDelay(delayIndex++).then(() => this.observer.emit('REVERT', 'before')))
      }, ['PriceMoved'])
      .then(r => {
        delayIndex = 0
        this.broadcastPurchase(r.buy, contractType)
        this.subscribeToOpenContract(r.buy.contract_id)
        this.renewProposalsOnPurchase()
        this.signal('purchase')
      })
  }
}
