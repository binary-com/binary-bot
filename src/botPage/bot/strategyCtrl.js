'use strict';
import Observer from 'binary-common-utils/observer';
import Ticktrade from './trade/ticktrade';

var StrategyCtrl = function StrategyCtrl(api, strategy) {
	this.observer = new Observer();
	this.api = api;
	this.strategy = strategy;
	this.ready = false;
	this.purchased = false;
	this.runningObservations = [];
	this.proposals = [];
};

StrategyCtrl.prototype = Object.create(null, {
	recoverFromDisconnect: {
		value: function recoverFromDisconnect() {
			var that = this;
			return new Promise(function ( resolve, reject ) {
				if ( that.trade ) {
					var apiProposalOpenContract = function ( contract ) {
						if ( contract.sell_price ) {
							that.observer.emit('trade.finish', contract);
							resolve();
						}
					};
					that.observer.register('api.proposal_open_contract', apiProposalOpenContract, true, {
						type: 'proposal_open_contract',
						unregister: [
							['api.proposal_open_contract', apiProposalOpenContract]
						]
					});
					var promise = that.trade.getTheContractInfoAfterSell();
					if ( !promise ) {
						resolve();
					}
				} else {
					resolve();
				}
			});
		}
	},
	updateProposal: {
		value: function updateProposal(proposal) {
			if ( !this.purchased ) {
				if ( this.proposals.length === 1 ) {
					this.proposals.push(proposal);
					this.observer.emit('strategy.ready');
					this.ready = true;
				} else {
					this.proposals = [proposal];
					this.ready = false;
				}
			}
		}
	},
	updateTicks: {
		value: function updateTicks(ticks) {
			if ( !this.purchased ) {
				if ( this.ready ) {
					this.strategy(ticks, this.proposals, this);
				} else {
					this.strategy(ticks, null, null);
				}
			}
		}
	},
	purchase: {
		value: function purchase(option) {
			if ( !this.purchased ) {
				this.purchased = true;
				var contract = (option === this.proposals[1].contract_type) ? this.proposals[1] : this.proposals[0];
				this.trade = new Ticktrade(this.api);
				var that = this;
				var tradeUpdate = function(contract) {
					that.observer.emit('strategy.tradeUpdate', contract);
				};
				var tradeFinish = function(contract){
					that.observer.emit('strategy.finish', contract);
					that.destroy();
				};
				this.observer.register('trade.update', tradeUpdate);
				this.observer.register('trade.finish', tradeFinish, true);
				this.runningObservations.push(['trade.update', tradeUpdate]);
				this.runningObservations.push(['trade.finish', tradeFinish]);
				this.trade.purchase(contract, tradeFinish);
			}
		}
	},
	destroy: {
		value: function destroy(offline) {
			for ( var i in this.runningObservations ) {
				this.observer.unregisterAll.apply(this.observer, this.runningObservations[i]);
			}
			this.proposals = [];
			this.ready = false;
			this.strategy = null;
			if ( this.trade ) {
				return this.trade.destroy(offline);
			}
		}
	}
});

module.exports = StrategyCtrl;
