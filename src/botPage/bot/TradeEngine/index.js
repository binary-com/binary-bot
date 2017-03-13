import { Map } from 'immutable'
import Proposal from './Proposal'
import Broadcast from './Broadcast'
import Total from './Total'
import Balance from './Balance'
import FollowTicks from './FollowTicks'
import OpenContract from './OpenContract'

const scopeToWatchResolve = {
  before: ['before', true],
  purchase: ['before', false],
  during: ['during', true],
  after: ['during', false],
}

export default class TradeEngine extends Balance(
  OpenContract(Proposal(FollowTicks(Broadcast(Total(class {})))))) {
  constructor($scope) {
    super()
    this.api = $scope.api
    this.observer = $scope.observer
    this.$scope = $scope
    this.observe()
    this.data = new Map()
    this.promises = new Map()
  }
  start(token, tradeOption) {
    this.makeProposals(tradeOption)

    this.followTicks(tradeOption.symbol)

    if (token === this.token) {
      return
    }

    this.api.authorize(token).then(() => {
      this.token = token
      this.subscribeToBalance()
    })
  }
  purchase(contractType) {
    const toBuy = this.selectProposal(contractType)

    this.isPurchaseStarted = true

    this.api.buyContract(toBuy.id, toBuy.ask_price).then(r => {
      this.broadcastPurchase(r.buy, contractType)
      this.subscribeToOpenContract(r.buy.contract_id)
      this.execContext('purchase')
    })
  }
  observe() {
    this.observeOpenContract()

    this.observeBalance()

    this.observeProposals()
  }
  execContext(scope) {
    const [watchName, arg] = scopeToWatchResolve[scope]

    if (this.promises.has(watchName)) {
      this.promises.get(watchName)(arg)
    }

    this.scope = scope
  }
  watch(scope) {
    return new Promise(resolve => {
      this.promises = this.promises.set(scope, resolve)
    })
  }
  getData() {
    return this.data
  }
  isInside(scope) {
    return this.scope === scope
  }
  listen(n, f) {
    this.api.events.on(n, f)
  }
}
