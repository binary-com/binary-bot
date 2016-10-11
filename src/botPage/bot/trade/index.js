import { observer } from 'binary-common-utils/lib/observer';
import { translator } from '../../../common/translator';

export default class Trade {
  constructor(api) {
    this.api = api;
    this.runningObservations = [];
    this.openContract = null;
    this.isSellAvailable = false;
    this.isSold = false;
  }
  sellAtMarket() {
    if (!this.isSold) {
      this.isSold = true;
      this.api.originalApi.sellContract(this.openContract.contract_id, 0).then(() => {
        this.getTheContractInfoAfterSell();
      }, () => 0);
    }
  }
  purchase(contract) {
    this.api.buy(contract.id, contract.ask_price);
    const apiBuy = (purchasedContract) => {
      observer.emit('log.trade.purchase', purchasedContract);
      observer.emit('ui.log.info',
        `${translator.translateText('Purchased')}: ${contract.longcode}`);
      observer.emit('trade.purchase', purchasedContract);
      this.isSold = false;
      this.contractId = purchasedContract.contract_id;
      this.api.originalApi.unsubscribeFromAllProposals().then(() => 0, () => 0);
      this.subscribeToOpenContract();
    };
    observer.register('api.buy', apiBuy, true, {
      type: 'buy',
      unregister: [['api.buy', apiBuy], 'trade.purchase'],
    });
    this.runningObservations.push(['api.buy', apiBuy]);
  }
  subscribeToOpenContract() {
    if (!this.contractId) {
      return false;
    }
    const apiProposalOpenContract = (contract) => {
      if (!this.isSold && contract.is_valid_to_sell) {
        if (contract.is_expired) {
          this.isSold = true;
          this.isSellAvailable = false;
          this.api.originalApi.sellExpiredContracts().then(() => 0, () => 0);
          this.getTheContractInfoAfterSell();
        } else {
          this.isSellAvailable = true;
        }
      }
      if (contract.sell_price) {
        this.openContract = null;
        observer.emit('log.trade.finish', contract);
        observer.emit('trade.finish', contract);
      } else {
        observer.emit('log.trade.update', contract);
        this.openContract = contract;
      }
      observer.emit('trade.update', contract);
    };
    observer.register('api.proposal_open_contract', apiProposalOpenContract, false, {
      type: 'proposal_open_contract',
      unregister: [
        ['api.proposal_open_contract', apiProposalOpenContract],
        'trade.update',
        'beforePurchase.tradeUpdate',
        'trade.finish',
        'beforePurchase.finish',
      ],
    });
    this.runningObservations.push(['api.proposal_open_contract', apiProposalOpenContract]);
    this.api.proposal_open_contract(this.contractId);
    return true;
  }
  getTheContractInfoAfterSell() {
    if (this.contractId) {
      this.api.originalApi.subscribeToOpenContract(this.contractId).then(() => 0, () => 0);
    }
  }
  destroy() {
    for (const obs of this.runningObservations) {
      observer.unregisterAll(...obs);
    }
    this.runningObservations = [];
    this.isSold = false;
    this.api.originalApi.unsubscribeFromAllProposalsOpenContract().then(() => 0, () => 0);
  }
}
