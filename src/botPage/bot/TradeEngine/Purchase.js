import { recoverFromError } from '../tools'

let delayIndex = 0

export default Engine => class Purchase extends Engine {
  purchase(contractType) {
    const { id, askPrice } = this.selectProposal(contractType)

    this.ongoingPurchase = true

    return recoverFromError(() => this.api.buyContract(id, askPrice),
      (errorCode, makeDelay) => {
        // if disconnected no need to resubscription (handled by live-api)
        if (errorCode !== 'DisconnectError') {
          this.renewProposalsOnPurchase()
        }

        this.waitForProposals()
          .then(() => makeDelay().then(() => this.observer.emit('REVERT', 'before')))
      }, ['PriceMoved'], delayIndex++)
      .then(r => {
        this.subscribeToOpenContract(r.buy.contract_id)
        this.signal('purchase')
        delayIndex = 0
        this.broadcastPurchase(r.buy, contractType)
        this.renewProposalsOnPurchase(id)
      })
  }
}
