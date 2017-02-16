import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import { translate } from '../../../common/i18n'
import { noop, subscribeToStream } from '../tools'

export default class Trade {
  constructor($scope) {
    this.api = $scope.api
    this.observer = $scope.observer
    this.CM = $scope.CM
    this.openContract = null
    this.isSellAvailable = false
    this.isSold = false
  }
  sellAtMarket() {
    if (!this.isSold && this.isSellAvailable) {
      this.api.originalApi.sellContract(
        this.openContract.contract_id, 0).then(() => {
          this.isSold = true
          this.isSellAvailable = false
        }).catch(noop)
    }
  }
  retryIfContractNotReceived(contract) {
    if (!('transaction_ids' in contract)) {
      this.api.proposal_open_contract(this.contractId)
      return true
    }
    return false
  }
  handleExpire(contract) {
    this.isSellAvailable = !this.isSold &&
      !contract.is_expired && contract.is_valid_to_sell

    if (!this.isSold && contract.is_valid_to_sell && contract.is_expired) {
      this.isSold = true
      this.api.originalApi.sellExpiredContracts().then(noop).catch(noop)
    }
  }
  handleUpdate(contract) {
    const finished = contract.sell_price
    if (finished) {
      this.openContract = null
      globalObserver.emit('log.trade.finish', contract)
      this.observer.emit('trade.finish', contract)
      this.api.originalApi.unsubscribeFromAllProposalsOpenContract().then(noop).catch(noop)
    } else {
      this.openContract = contract
      globalObserver.emit('log.trade.update', contract)
      this.observer.emit('trade.update', contract)
    }
    this.CM.execContext(finished ? 'after' : 'during', contract)
  }
  subscribeToOpenContract() {
    if (!this.contractId) {
      return
    }
    subscribeToStream(this.observer, 'api.proposal_open_contract', contract => {
      if (this.retryIfContractNotReceived(contract)) {
        return
      }

      this.handleExpire(contract)

      this.handleUpdate(contract)
    }, () => this.api.proposal_open_contract(this.contractId),
    false, 'proposal_open_contract', ['trade.update', 'trade.finish'])
  }
  purchase(contract) {
    subscribeToStream(this.observer, 'api.buy', purchasedContract => {
      globalObserver.emit('log.trade.purchase', purchasedContract)
      this.observer.emit('trade.purchase', { contract, purchasedContract })
      globalObserver.emit('ui.log.info', `${translate('Purchased')}: ${contract.longcode}`)

      this.isSold = false

      this.contractId = purchasedContract.contract_id
      this.api.originalApi.unsubscribeFromAllProposals().then(noop).catch(noop)
      this.subscribeToOpenContract()
    }, () => this.api.buy(contract.id, contract.ask_price),
    true, 'buy', ['trade.purchase'])
  }
}
