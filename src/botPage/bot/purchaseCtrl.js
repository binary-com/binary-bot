import { observer } from 'binary-common-utils/lib/observer'
import Trade from './trade'

export default class PurchaseCtrl {
  constructor(api, beforePurchase, duringPurchase) {
    this.expectedNumOfProposals = 2
    this.api = api
    this.beforePurchase = beforePurchase
    this.duringPurchase = duringPurchase
    this.ready = false
    this.purchased = false
    this.runningObservations = []
    this.proposals = {}
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
  updateTicks(ticks) {
    const ohlc = ticks.ohlc
    if (ohlc) {
      const repr = function repr() {
        return JSON.stringify(this)
      }
      for (const o of ohlc) {
        o.toString = repr
      }
    }
    this.ticks = ticks
    if (!this.purchased) {
      if (this.ready) {
        observer.emit('log.purchase.start', {
          proposals: this.proposals,
        })
        this.beforePurchase()
      }
    }
  }
  purchase(option) {
    observer.emit('log.purchase.purchase', {
      proposals: this.proposals,
      purchasing: option,
    })
    if (!this.purchased) {
      this.purchased = true
      const contract = this.getContract(option)
      this.trade = new Trade(this.api)
      const tradeUpdate = (openContract) => {
        this.openContract = openContract
        this.duringPurchase()
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
  isSellAvailable() {
    return this.trade && this.trade.isSellAvailable
  }
  sellAtMarket() {
    if (this.trade && this.trade.isSellAvailable) {
      this.trade.sellAtMarket()
    }
  }
  getContract(option) {
    return this.proposals[option]
  }
  destroy() {
    for (const obs of this.runningObservations) {
      observer.unregisterAll(...obs)
    }
    this.runningObservations = []
    this.proposals = {}
    this.ready = false
    this.beforePurchase = null
    if (this.trade) {
      this.trade.destroy()
    }
  }
}
