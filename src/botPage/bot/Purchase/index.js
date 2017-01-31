import { observer as viewObserver } from '../../../common/shared'
import Trade from './Trade'

export default class PurchaseCtrl {
  constructor($scope, CM) {
    this.api = $scope.api
    this.$scope = $scope
    this.CM = CM
    this.ready = false
    this.purchased = false
    this.proposals = {}
    this.expectedNumOfProposals = 2
  }
  getContract(option) {
    return this.proposals[option]
  }
  isSellAvailable() {
    return this.trade && this.trade.isSellAvailable
  }
  sellAtMarket() {
    return this.trade &&
      this.trade.isSellAvailable && this.trade.sellAtMarket()
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
      viewObserver.emit('log.purchase.start', { proposals: this.proposals })
      this.CM.execContext('before', this.proposals)
    }
  }
  purchase(option) {
    if (!this.purchased && this.ready) {
      this.purchased = true
      this.trade = new Trade(this.$scope, this.CM)
      this.trade.purchase(this.proposals[option])
    }
  }
}
