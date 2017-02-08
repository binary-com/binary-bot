import { observer } from 'binary-common-utils/lib/observer'
import Trade from './trade'

export default class PurchaseCtrl {
  constructor(api, context) {
    this.api = api
    this.context = context
    this.createInterface()
    this.ready = false
    this.purchased = false
    this.proposals = {}
    this.expectedNumOfProposals = 2
  }
  createInterface() {
    this.context.addFunc({
      purchase: option => this.purchase(option),
      isSellAvailable: () => this.trade && this.trade.isSellAvailable,
      getContract: option => this.proposals[option],
      sellAtMarket: () => (this.trade && this.trade.isSellAvailable &&
        this.trade.sellAtMarket()),
    })
  }
  setNumOfProposals(num) {
    this.expectedNumOfProposals = num
  }
  updateProposal(proposal) {
    if (!this.purchased) {
      this.proposals[proposal.contract_type] = proposal
      if (!this.ready &&
        Object.keys(this.proposals).length === this.expectedNumOfProposals) {
        this.ready = true
      }
    }
  }
  updateTicks() {
    if (!this.purchased && this.ready) {
      observer.emit('log.purchase.start', { proposals: this.proposals })
      this.context.beforePurchase()
    }
  }
  purchase(option) {
    if (!this.purchased && this.ready) {
      this.purchased = true

      observer.register('trade.update', openContract => {
        this.context.duringPurchase(openContract)
        observer.emit('purchase.tradeUpdate', openContract)
      }, false, null, true)
      observer.register('trade.finish', finishedContract => {
        this.ready = false
        observer.emit('purchase.finish', finishedContract)
      }, true, null, true)

      this.trade = new Trade(this.api)
      this.trade.purchase(this.proposals[option])
    }
  }
}
