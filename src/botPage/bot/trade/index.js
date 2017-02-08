import { observer } from 'binary-common-utils/lib/observer'
import { translate } from '../../../common/i18n'

import { noop, subscribeToStream } from '../tools'

export default class Trade {
  constructor(api) {
    this.api = api
    this.openContract = null
    this.isSellAvailable = false
    this.isSold = false
  }
  sellAtMarket() {
    if (!this.isSold) {
      this.isSold = true
      this.api.originalApi.sellContract(this.openContract.contract_id, 0)
        .then(() => this.getTheContractInfoAfterSell(), noop)
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
      this.getTheContractInfoAfterSell()
    }
  }
  onContractUpdate(contract) {
    if (contract.sell_price) {
      this.openContract = null
      observer.emit('log.trade.finish', contract)
      observer.emit('trade.finish', contract)
      this.api.originalApi.unsubscribeFromAllProposalsOpenContract().then(noop, noop)
    } else {
      observer.emit('log.trade.update', contract)
      this.openContract = contract
    }
    observer.emit('trade.update', contract)
  }
  subscribeToOpenContract() {
    if (!this.contractId) {
      return
    }
    subscribeToStream(
      'api.proposal_open_contract', contract => {
        if (this.retryIfContractNotReceived(contract)) {
          return
        }

        this.onContractExpire(contract)

        this.isSellAvailable = !this.isSold &&
          !contract.is_expired && contract.is_valid_to_sell

        this.onContractUpdate(contract)
      }, () => this.api.proposal_open_contract(this.contractId),
      false, 'proposal_open_contract',
      ['trade.update', 'purchase.tradeUpdate', 'trade.finish', 'purchase.finish'])
  }
  purchase(contract) {
    subscribeToStream(
      'api.buy', purchasedContract => {
        observer.emit('log.trade.purchase', purchasedContract)
        observer.emit('trade.purchase', { contract, purchasedContract })
        observer.emit('ui.log.info', `${translate('Purchased')}: ${contract.longcode}`)

        this.isSold = false

        this.contractId = purchasedContract.contract_id
        this.api.originalApi.unsubscribeFromAllProposals().then(noop, noop)
        this.subscribeToOpenContract()
      }, () => this.api.buy(contract.id, contract.ask_price),
      true, 'buy', ['trade.purchase'])
  }
  getTheContractInfoAfterSell() {
    if (this.contractId) {
      this.api.originalApi.subscribeToOpenContract(this.contractId).then(noop, noop)
    }
  }
}
