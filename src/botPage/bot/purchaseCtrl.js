import { observer } from 'binary-common-utils/lib/observer'
import Trade from './trade'

export default class PurchaseCtrl {
  constructor(api, context) {
    this.api = api
    this.context = context
    this.createInterface()
    this.ready = this.purchased = false
    this.runningObservations = []
    this.proposals = {}
    this.expectedNumOfProposals = 2
  }
  setNumOfProposals(num) {
    this.expectedNumOfProposals = num
  }
  updateProposal(proposal) {
    if (!this.purchased) {
      this.proposals[proposal.contract_type] = proposal
      if (!this.ready && Object.keys(this.proposals).length === this.expectedNumOfProposals) {
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
    observer.emit('log.purchase.purchase', {
      proposals: this.proposals,
      purchasing: option,
    })
    if (!this.purchased) {
      this.purchased = true
      const contract = this.proposals[option]
      this.trade = new Trade(this.api)
      const tradeUpdate = (openContract) => {
        this.context.duringPurchase(openContract)
        observer.emit('purchase.tradeUpdate', openContract)
      }
      const tradeFinish = finishedContract =>
        observer.emit('purchase.finish', finishedContract)

      observer.register('trade.update', tradeUpdate)
      observer.register('trade.finish', tradeFinish, true)
      this.runningObservations.push(['trade.update', tradeUpdate])
      this.runningObservations.push(['trade.finish', tradeFinish])
      this.trade.purchase(contract, tradeFinish)
    }
  }
  createInterface() {
    this.context.addFunc({
      purchase: option => this.purchase(option),
      isSellAvailable: (() =>
        this.trade && this.trade.isSellAvailable),
      getContract: (option =>
        this.proposals[option]),
      sellAtMarket: () =>
        (this.trade && this.trade.isSellAvailable &&
          this.trade.sellAtMarket()),
    })
  }
  destroy() {
    for (const obs of this.runningObservations) {
      observer.unregisterAll(...obs)
    }
    this.runningObservations = []
    this.proposals = {}
    this.ready = false
    if (this.trade) {
      this.trade.destroy()
    }
  }
}
