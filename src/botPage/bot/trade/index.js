import Observer from 'binary-common-utils/lib/observer';
import { translator } from '../../../common/translator';

export default class Trade {
  constructor(api) {
    this.observer = new Observer();
    this.api = api;
    this.contractIsSold = false;
    this.runningObservations = [];
  }
  recoverFromDisconnect() {
    for (let obs of this.runningObservations) {
      this.observer.unregisterAll(...obs);
    }
    this.runningObservations = [];
    return this.subscribeToOpenContract();
  }
  purchase(contract) {
    this.api.buy(contract.id, contract.ask_price);
    let apiBuy = (purchasedContract) => {
      this.observer.emit('ui.log.info', translator.translateText('Purchased') + ': ' + contract.longcode);
      this.observer.emit('trade.purchase', purchasedContract);
      this.contractId = purchasedContract.contract_id;
      this.api._originalApi.unsubscribeFromAllProposals().then(() => 0, (e) => this.observer.emit('api.error', e));
      this.subscribeToOpenContract();
    };
    this.observer.register('api.buy', apiBuy, true, {
      type: 'buy',
      unregister: [['api.buy', apiBuy], 'trade.purchase'],
    });
    this.runningObservations.push(['api.buy', apiBuy]);
  }
  subscribeToOpenContract() {
    if (!this.contractId) {
      return false;
    }
    this.api.proposal_open_contract(this.contractId);
    let apiProposalOpenContract = (contract) => {
      // detect changes and decide what to do when proposal is updated
      if (contract.is_expired && contract.is_valid_to_sell && !this.contractIsSold) {
        this.contractIsSold = true;
        this.api._originalApi.sellExpiredContracts().then(() => this.getTheContractInfoAfterSell(),
          (error) => this.observer.emit('api.error', error));
      }
      if (contract.sell_price) {
        this.observer.emit('trade.finish', contract);
      }
      this.observer.emit('trade.update', contract);
    };
    this.observer.register('api.proposal_open_contract', apiProposalOpenContract, false, {
      type: 'proposal_open_contract',
      unregister: [
        ['api.proposal_open_contract', apiProposalOpenContract],
        'trade.update',
        'strategy.tradeUpdate',
        'trade.finish',
        'strategy.finish',
      ],
    });
    this.runningObservations.push(['api.proposal_open_contract', apiProposalOpenContract]);
    return true;
  }
  getTheContractInfoAfterSell() {
    if (this.contractId) {
      this.api._originalApi.getContractInfo(this.contractId);
    }
  }
  destroy(offline) {
    for (let obs of this.runningObservations) {
      this.observer.unregisterAll(...obs);
    }
    this.runningObservations = [];
    this.contractIsSold = false;
    if (!offline) {
      return this.api._originalApi.unsubscribeFromAlProposals();
    }
		return null;
  }
}
