'use strict';
import Observer from 'binary-common-utils/observer';
import Translator from 'translator';

var Ticktrade = function Ticktrade(api) {
	this.observer = new Observer();
	this.api = api;
	this.purchaseInProgress = false;
	this.translator = new Translator();
	this.runningObservations = [];
};

Ticktrade.prototype = Object.create(null, {
	purchase: {
		value: function purchase(contract) {
			this.observer.emit('ui.log.info', this.translator.translateText('Purchased') + ': ' + contract.longcode);
			var that = this;
			this.api.buy(contract.id, contract.ask_price);
			this.observer.registerOnce('api.buy', function(purchasedContract){
				that.observer.emit('trade.purchase', purchasedContract);
				that.contractId = purchasedContract.contract_id;
				that.purchaseInProgress = true;
				that.api._originalApi.unsubscribeFromAllProposals();
				that.subscribeToOpenContract();
			});
		}
	},
	subscribeToOpenContract: {
		value: function subscribeToOpenContract(){
			this.api.proposal_open_contract(this.contractId);
			var that = this;
			var apiProposalOpenContract = function(contract){
				// detect changes and decide what to do when proposal is updated
				if (contract.is_expired) {
					that.api._originalApi.sellExpiredContracts();
					that.getTheContractInfoAfterSell();
				}
				if ( contract.sell_price ) {
					that.observer.emit('trade.finish', contract);
					that.destroy();
				}
				that.observer.emit('trade.update', contract);
			};
			this.observer.register('api.proposal_open_contract', apiProposalOpenContract);
			this.runningObservations.push(['api.proposal_open_contract', apiProposalOpenContract]);
		}
	},
	getTheContractInfoAfterSell: {
		value: function getTheContractInfoAfterSell() {
			this.api._originalApi.getContractInfo(this.contractId);
		}
	},
	destroy: {
		value: function destroy(){
			this.purchaseInProgress = false;
			for ( var i in this.runningObservations  ) {
				this.observer.unregisterAll.apply(this.observer, this.runningObservations[i]);
			}
			this.api._originalApi.unsubscribeFromAlProposals();
		}
	}
});

module.exports = Ticktrade;
