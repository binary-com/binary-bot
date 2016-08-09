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
	this.proposals = {};
};

StrategyCtrl.prototype = Object.create(null, {
	recoverFromDisconnect: {
		value: function recoverFromDisconnect() {
			var that = this;
			for ( var i in this.runningObservations ) {
				this.observer.unregisterAll.apply(this.observer, this.runningObservations[i]);
			}
			this.runningObservations = [];

			if ( !that.trade || !that.trade.recoverFromDisconnect() ) {
				this.observer.emit('strategy.recovered', {
					tradeWasRunning: false
				});
				return;
			}
			var tradeFinish = function(contract){
				that.trade.destroy();
				that.observer.emit('strategy.recovered', {
					tradeWasRunning: true,
					finishedContract: contract
				});
			};
			this.observer.register('trade.finish', tradeFinish, true);
			this.runningObservations.push(['trade.finish', tradeFinish]);
		}
	},
	updateProposal: {
		value: function updateProposal(proposal) {
			if ( !this.purchased ) {
				this.proposals[proposal.contract_type] = proposal;
				if ( !this.ready && Object.keys(this.proposals).length === 2 ) {
					this.ready = true;
					this.observer.emit('strategy.ready');
				}
			}
		}
	},
	updateTicks: {
		value: function updateTicks(data) {
			var ticks = data.ticks; 
			var candles = data.candles; 
			if ( !this.purchased ) {
				var direction = '';
				var length = ticks.length;
				if ( length >= 2 ) {
					if ( ticks[length-1].quote > ticks[length-2].quote ) {
						direction = 'rise';
					}
					if ( ticks[length-1].quote < ticks[length-2].quote ) {
						direction = 'fall';
					}
				}
				if ( this.ready ) {
					this.strategy({
						direction: direction,
						candles: candles,
						ticks: ticks
					}, this.proposals, this);
				} else {
					this.strategy({
						direction: direction,
						candles: candles,
						ticks: ticks
					}, null, null);
				}
			}
		}
	},
	purchase: {
		value: function purchase(option) {
			if ( !this.purchased ) {
				this.purchased = true;
				var contract = this.proposals[option];
				this.trade = new Ticktrade(this.api);
				var that = this;
				var tradeUpdate = function(contract) {
					that.observer.emit('strategy.tradeUpdate', contract);
				};
				var tradeFinish = function(contract){
					that.observer.emit('strategy.finish', contract);
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
			this.runningObservations = [];
			this.proposals = {};
			this.ready = false;
			this.strategy = null;
			if ( this.trade ) {
				return this.trade.destroy(offline);
			}
		}
	}
});

module.exports = StrategyCtrl;
