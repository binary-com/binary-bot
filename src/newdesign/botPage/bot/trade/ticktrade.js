var observer = require('common/observer');

var Ticktrade = function Ticktrade(api) {
	this.api = api;
	this.contractLive = false;
}

Ticktrade.prototype = Object.create(null, {
	purchase: {
		value: function purchase(contract) {
			log(i18n._('Purchased') + ': ' + contract.proposal.longcode, 'info');
			var that = this;
			this.api.buy(contract.proposal.id, contract.proposal.ask_price);
			observer.register('api.buy', function(purchasedContract){
				that.contractLive = true;
				that.api._originalApi.unsubscribeFromAllProposals();
				that.api._originalApi.subscribeToOpenContract(purchasedContract.contract_id);
			});
		}
	},
	subscribeToOpenContract: {
		value: function subscribeToOpenContract(contractId){
			this.api.proposal_open_contract(contractId);
			var that = this;
			observer.register('api.proposal_open_contract', function(contract){
				// detect changes and decide what to do when proposal is updated
				if (contract.is_expired) {
					that.api._originalApi.sellExpiredContracts();
				}
				if ( contract.sell_price ) {
					observer.emit('trade.finish', contract);
					that.finish();
				}
				observer.emit('ui.contractUpdate', contract);
			});
		}
	},
	finish: {
		value: function finish(){
			this.api._originalApi.unsubscribeFromAllOpenContracts();
		}
	}
});

module.exports = Ticktrade;