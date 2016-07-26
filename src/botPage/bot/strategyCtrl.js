'use strict';
import Observer from 'binary-common-utils/observer';
import Ticktrade from './trade/ticktrade';

var StrategyCtrl = function StrategyCtrl(api, strategy) {
	this.observer = new Observer();
	this.api = api;
	this.strategy = strategy;
	this.ready = false;
	this.purchased = false;
	this.proposals = [];
};

StrategyCtrl.prototype = Object.create(null, {
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
				this.observer.register('trade.finish', function(contract){
					that.observer.emit('strategy.finish', contract);
					that.destroy();
				}, true);
				this.trade.purchase(contract);
			}
		}
	},
	destroy: {
		value: function destroy() {
			if ( this.trade ) {
				this.trade.destroy();
			}
			this.proposals = [];
			this.ready = false;
			this.strategy = null;
		}
	}
});

module.exports = StrategyCtrl;
