var observer = require('common/observer');
var Translator = require('common/translator');

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
				if (contract.is_valid_to_sell) {
					that.api._originalApi.sellExpiredContracts();
					that.getTheContractInfoAfterSell();
				}
				if ( contract.sell_price ) {
					console.log('finished!!!!');
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
		}
	}
});

module.exports = Ticktrade;