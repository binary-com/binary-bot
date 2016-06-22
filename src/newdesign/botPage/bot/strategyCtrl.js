var observer = require('common/observer');

var StrategyCtrl = function StrategyCtrl(api, strategy) {
	this.api = api;
	this.strategy = strategy;
	this.strategyStarted = false;
	this.ready = false;
	this.proposals = [];
}

StrategyCtrl.prototype = Object.create(null, {
	updateProposal: {
		value: function updateProposal(proposal) {
			if ( this.proposals.length === 1 ) {
				if ( !this.strategyStarted ) {
					this.strategyStarted = true;
				}
				this.proposals.push(proposal);
				this.ready = true;
			} else {
				this.proposals = [proposal];
				this.ready = false;
			}
		}
	},
	updateTicks: {
		value: function updateTicks(ticks) {
			if ( this.ready ) {
				this.strategy(ticks, this.proposals);
			}
		}
	}
});

module.exports = StrategyCtrl;
