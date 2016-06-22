var observer = require('common/observer');
var TickTrade = require('./trade/ticktrade');

var StrategyCtrl = function StrategyCtrl(api, strategy, finish) {
	this.api = api;
	this.strategy = strategy;
	this.finish = finish;
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
	},
	purchase: {
		value: function purchase(option) {
			var contract = (option === this.proposals[1].echo_req.contract_type) ? this.proposals[1] : this.proposals[0];
			this.trade = new TickTrade(contract);
			observer.register('trade.finish', function(contract){
				this.finish(contract);
			})
		}
	}
});

module.exports = StrategyCtrl;
