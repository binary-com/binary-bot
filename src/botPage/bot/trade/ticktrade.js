var observer = require('binary-common-utils/observer');
var Translator = require('translator');

var Ticktrade = function Ticktrade(api) {
	this.api = api;
	this.purchaseInProgress = false;
	this.translator = new Translator();
};

Ticktrade.prototype = Object.create(null, {
	purchase: {
		value: function purchase(contract) {
			observer.emit('ui.log.info', this.translator.translateText('Purchased') + ': ' + contract.longcode);
			var that = this;
			this.api.buy(contract.id, contract.ask_price);
			observer.registerOnce('api.buy', function(purchasedContract){
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
			observer.register('api.proposal_open_contract', function(contract){
				// detect changes and decide what to do when proposal is updated
				if (contract.is_expired) {
					that.api._originalApi.sellExpiredContracts();
					that.getTheContractInfoAfterSell();
				}
				if ( contract.sell_price ) {
					observer.emit('trade.finish', contract);
					that.destroy();
				}
				observer.emit('trade.update', contract);
			});
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
			observer.unregisterAll('api.proposal_open_contract');
			observer.unregisterAll('api.buy');
			this.api._originalApi.unsubscribeFromAllOpenContracts();
		}
	}
});

module.exports = Ticktrade;
