import { observer } from 'binary-common-utils/lib/observer';
import { translator } from '../../../common/translator';

export default class Trade {
  constructor(api) {
    this.api = api;
    this.contractIsSold = false;
    this.runningObservations = [];
  }
  purchase(contract) {
    this.api.buy(contract.id, contract.ask_price);
    let apiBuy = (purchasedContract) => {
      observer.emit('ui.log.info', translator.translateText('Purchased') + ': ' + contract.longcode);
      observer.emit('trade.purchase', purchasedContract);
      this.contractId = purchasedContract.contract_id;
      this.api.originalApi.unsubscribeFromAllProposals(); // no promise
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
    let apiProposalOpenContract = (contract) => {
      // detect changes and decide what to do when proposal is updated
      if (contract.is_expired && contract.is_valid_to_sell && !this.contractIsSold) {
        this.contractIsSold = true;
        this.api.originalApi.sellExpiredContracts(); // no promise
        this.getTheContractInfoAfterSell();
      }
      if (contract.sell_price) {
        observer.emit('trade.finish', contract);
      }
      observer.emit('trade.update', contract);
    };
    observer.register('api.proposal_open_contract', apiProposalOpenContract, false, {
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
    this.api.proposal_open_contract(this.contractId);
    return true;
  }
  getTheContractInfoAfterSell() {
    if (this.contractId) {
      this.api.originalApi.subscribeToOpenContract(this.contractId);
    }
  }
  destroy() {
    for (let obs of this.runningObservations) {
      observer.unregisterAll(...obs);
    }
    this.runningObservations = [];
    this.contractIsSold = false;
    this.api.originalApi.unsubscribeFromAllProposalsOpenContract();
  }
}
