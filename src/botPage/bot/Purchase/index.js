import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import Trade from './Trade'

export default class Purchase {
  constructor($scope) {
    this.api = $scope.api
    this.CM = $scope.CM
    this.$scope = $scope
    this.ready = false
    this.purchased = false
    this.proposals = {}
    this.expectedNumOfProposals = 2
  }
  getContract(option) {
    return this.proposals[option]
  }
  isSellAvailable() {
    return !!(this.trade && this.trade.isSellAvailable)
  }
  sellAtMarket() {
    this.trade.sellAtMarket()
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
      globalObserver.emit('log.purchase.start', { proposals: this.proposals })
      this.CM.execContext('before', this.proposals)
    }
  }
  purchase(option) {
    if (!this.purchased && this.ready) {
      this.purchased = true
      this.trade = new Trade(this.$scope)
      this.trade.purchase(this.proposals[option])
      this.CM.execContext('between-before-and-during')
    }
  }
}
