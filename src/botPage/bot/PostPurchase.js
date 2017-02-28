import { subscribeToStream, doUntilDone } from './tools'

export default class Trade {
  constructor($scope) {
    this.api = $scope.api
    this.observer = $scope.observer
    this.CM = $scope.CM
  }
  init() {
    this.openContract = null
    this.contractId = null
    this.isSellAvailable = false
    this.isSold = false
  }
  start(contractId) {
    this.init()
    this.contractId = contractId
    this.subscribeToOpenContract()
  }
  sellAtMarket() {
    if (!this.isSold && this.isSellAvailable) {
      doUntilDone(() => this.api.originalApi.sellContract(
        this.openContract.contract_id, 0)).then(() => {
          this.isSold = true
          this.isSellAvailable = false
        })
    }
  }
  handleExpire(contract) {
    this.isSellAvailable = !this.isSold &&
      !contract.is_expired && contract.is_valid_to_sell

    if (!this.isSold && contract.is_valid_to_sell && contract.is_expired) {
      this.isSold = true
      doUntilDone(() => this.api.originalApi.sellExpiredContracts())
    }
  }
  handleUpdate(contract) {
    const finished = contract.sell_price
    if (finished) {
      this.openContract = null
      this.observer.emit('trade.finish', contract)
      this.CM.execContext('after', contract)
    } else {
      this.openContract = contract
      this.observer.emit('trade.update', contract)
      this.CM.execContext('during', contract)
    }
  }
  subscribeToOpenContract() {
    if (!this.contractId) {
      return
    }
    subscribeToStream(this.observer, 'api.proposal_open_contract', contract => {
      this.handleExpire(contract)

      this.handleUpdate(contract)
    }, () => doUntilDone(() => this.api.originalApi.subscribeToOpenContract(this.contractId)),
    false, 'proposal_open_contract', ['trade.update', 'trade.finish'])
  }
  checkSellAvailable() {
    return !!this.isSellAvailable
  }
}
