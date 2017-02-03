import { translate } from '../../../common/i18n'
import { observer as viewObserver } from '../../common/shared'
import { noop } from '../tools'

export default class Trade {
  constructor($scope, CM) {
    this.api = $scope.api
    this.observer = $scope.observer
    this.CM = CM || { execContext() {} }
    this.openContract = null
    this.isSellAvailable = false
    this.isSold = false
  }
  subscribeToStream(
    name, respHandler, request, registerOnce, type, unregister
  ) {
    return new Promise((resolve) => {
      this.observer.register(
        name, (...args) => {
          respHandler(...args)
          resolve()
        }, registerOnce, type && { type, unregister }, true)
      request()
    })
  }
  sellAtMarket() {
    if (!this.isSold) {
      this.isSold = true
      this.api.originalApi.sellContract(
        this.openContract.contract_id, 0).then(noop, noop)
    }
  }
  retryIfContractNotReceived(contract) {
    if (!('transaction_ids' in contract)) {
      this.api.proposal_open_contract(this.contractId)
      return true
    }
    return false
  }
  onContractExpire(contract) {
    if (!this.isSold && contract.is_valid_to_sell && contract.is_expired) {
      this.isSold = true
      this.isSellAvailable = false
      this.api.originalApi.sellExpiredContracts().then(noop, noop)
    }
  }
  onContractUpdate(contract) {
    const finished = contract.sell_price
    if (finished) {
      this.openContract = null
      viewObserver.emit('log.trade.finish', contract)
      this.observer.emit('trade.finish', contract)
      this.api.originalApi.unsubscribeFromAllProposalsOpenContract().then(noop, noop)
    } else {
      this.openContract = contract
      viewObserver.emit('log.trade.update', contract)
      this.observer.emit('trade.update', contract)
    }
    this.CM.execContext(finished ? 'after' : 'during', contract)
  }
  subscribeToOpenContract() {
    if (!this.contractId) {
      return
    }
    this.subscribeToStream(
      'api.proposal_open_contract', contract => {
        if (this.retryIfContractNotReceived(contract)) {
          return
        }

        this.isSellAvailable = !this.isSold &&
          !contract.is_expired && contract.is_valid_to_sell

        this.onContractUpdate(contract)

        this.onContractExpire(contract)
      }, () => this.api.proposal_open_contract(this.contractId),
      false, 'proposal_open_contract', ['trade.update', 'trade.finish'])
  }
  purchase(contract) {
    this.subscribeToStream(
      'api.buy', purchasedContract => {
        viewObserver.emit('log.trade.purchase', purchasedContract)
        this.observer.emit('trade.purchase', { contract, purchasedContract })
        viewObserver.emit('ui.log.info', `${translate('Purchased')}: ${contract.longcode}`)

        this.isSold = false

        this.contractId = purchasedContract.contract_id
        this.api.originalApi.unsubscribeFromAllProposals().then(noop, noop)
        this.subscribeToOpenContract()
      }, () => this.api.buy(contract.id, contract.ask_price),
      true, 'buy', ['trade.purchase'])
  }
}
