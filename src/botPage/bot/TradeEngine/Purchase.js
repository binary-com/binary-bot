import { recoverFromError } from '../tools'
import { info } from '../broadcast'

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
        const { buy, buy: { contract_id: contractId, longcode } } = r

        this.subscribeToOpenContract(contractId)
        this.signal('purchase')
        this.renewProposalsOnPurchase(id)
        delayIndex = 0
        info({
          totalRuns: this.updateAndReturnTotalRuns(),
          transaction_ids: { buy: buy.transaction_id },
          contract_type: contractType,
          buy_price: buy.buy_price,
        })
      })
  }
}
