'use strict';
import Observer from 'binary-common-utils/observer';
import Translator from 'translator';

var Ticktrade = function Ticktrade(api) {
	this.observer = new Observer();
	this.api = api;
	this.contractIsSold = false;
	this.translator = new Translator();
	this.runningObservations = [];
};

Ticktrade.prototype = Object.create(null, {
	recoverFromDisconnect: {
		value: function recoverFromDisconnect(){
			for ( var i in this.runningObservations  ) {
				this.observer.unregisterAll.apply(this.observer, this.runningObservations[i]);
			}
			this.runningObservations = [];
			return this.subscribeToOpenContract();
		}
	},
	purchase: {
		value: function purchase(contract) {
			var that = this;
			this.api.buy(contract.id, contract.ask_price);
			var apiBuy = function apiBuy(purchasedContract){
				that.observer.emit('ui.log.info', that.translator.translateText('Purchased') + ': ' + contract.longcode);
				that.observer.emit('trade.purchase', purchasedContract);
				that.contractId = purchasedContract.contract_id;
				that.api._originalApi.unsubscribeFromAllProposals();
				that.subscribeToOpenContract();
			};
			this.observer.register('api.buy', apiBuy, true, {
				type: 'buy',
				unregister: [['api.buy', apiBuy], 'trade.purchase']
			});
			this.runningObservations.push(['api.buy', apiBuy]);
		}
	},
	subscribeToOpenContract: {
		value: function subscribeToOpenContract(){
			if ( !this.contractId ) {
				return false;
			}
			this.api.proposal_open_contract(this.contractId);
			var that = this;
			var apiProposalOpenContract = function(contract){
				// detect changes and decide what to do when proposal is updated
				if (contract.is_expired && contract.is_valid_to_sell &&!that.contractIsSold ) {
					that.contractIsSold = true;
					that.api._originalApi.sellExpiredContracts().then(function(){
						that.getTheContractInfoAfterSell();
					});
				}
				if ( contract.sell_price ) {
					that.observer.emit('trade.finish', contract);
				}
				that.observer.emit('trade.update', contract);
			};
			this.observer.register('api.proposal_open_contract', apiProposalOpenContract, false, {
				type: 'proposal_open_contract',
				unregister: [
					['api.proposal_open_contract', apiProposalOpenContract],
					'trade.update',
					'strategy.tradeUpdate',
					'trade.finish',
					'strategy.finish'
				]
			});
			this.runningObservations.push(['api.proposal_open_contract', apiProposalOpenContract]);
			return true;
		}
	},
	getTheContractInfoAfterSell: {
		value: function getTheContractInfoAfterSell() {
			if ( this.contractId ) {
				this.api._originalApi.getContractInfo(this.contractId);
			}
		}
	},
	destroy: {
		value: function destroy(offline){
			for ( var i in this.runningObservations  ) {
				this.observer.unregisterAll.apply(this.observer, this.runningObservations[i]);
			}
			this.runningObservations = [];
			this.contractIsSold = false;
			if ( !offline ) {
				return this.api._originalApi.unsubscribeFromAlProposals();
			}
		}
	}
});

module.exports = Ticktrade;
