var observer = require('common').observer;
var storageManager = require('common').storageManager;

module.exports = {
	strategy: null,
	finish: null,
	state: 'notInitialized',
	running: false,
	token: null,
	options: null,
	api: null,
	ticks = [],
	purchasedContractId: null,
	contractForChart: null,
	init: function init(token, options) {
		if (!token || !options) {
			throw(Error('Both token and proposal options should be passed to the start function'));
		}
		this.token = token;
		this.options = options;
		if ( !this.api ) {
			this.api = new LiveApi({ appId: storageManager.get('appId') });
			this.observeTicks();
			this.observeProposal();
			this.observeTransaction();
			this.observeOpenContracts();
			this.observeAuthorize();
		}
		this.start();
	},
	stop: function stop(){
		running = false;
	},
	restart: function restart(){
		switch(this.state){
			case 'notInitialized':
				throw(Error('Cannot restart the trade before initialization'));
				break;
			case 'purchaseInProcess':
				if ( this.running ) {
					throw(Error('Restart must be desabled when the trade is running'));
				} else {
					async:
					this.inquirePurchaseInfo();
					this.start();
				}
				break;
			case 'finished':
				if ( this.running ) {
					throw(Error('The state cannot be finished if the trade is not running'));
				}
			case 'initialized':
				this.start();
				break;
			default:
				throw(Error('Case is unknown'))
				break;
		}
	},
	start: function start(){
		if (this.token === '') {
			this.running = false;
			observer.emit('ui.error', i18n._('No token is available to authenticate'));
		} else {
			if ( !this.strategy || !this.finish ) {
				throw(Error('Both Strategy and Finish have to be assigned to the trade'));
			}
			this.running = true;
			this.state = 'initialized';
			purchasedContractId = '';
			observer.emit('ui.disableRun', false);
			contracts = [];
			chart = null;
			if (trade_again) {
				restartContracts();
			} else {
				api.authorize(token);
			}
		}
	},
	observeTicks = function observeTicks() {
		var that = this;
		this.api.events.on('tick', function (feed) {
			observer.emit('ui.log', i18n._('tick received at:') + ' ' + feed.tick.epoch);
			that.ticks = that.ticks.concat({
				epoch: +feed.tick.epoch,
				quote: +feed.tick.quote,
			});
			that.updateChart();
			that.callStrategy();
		});
		this.api.events.on('history', function (feed) {
			that.ticks = [];
			feed.history.times.forEach(function (time, index) {
				that.ticks.push({
					epoch: +time,
					quote: +feed.history.prices[index]
				});
			});
		});
	},
	observeTransaction = function observeTransaction() {
		var that = this;
		this.api.events.on('transaction', function (response) {
			var transaction = response.transaction;
			observer.emit('ui.updateBalance', transaction);
			observer.emit('ui.log', transaction);
			if (transaction.contract_id === that.purchasedContractId) {
				if (transaction.action === 'buy') {
					that.api.unsubscribeFromAllProposals();
				} else if (transaction.action === 'sell') {
					that.getContractInfo();
				}
			}
		});
	},
	observeOpenContracts = function observeOpenContracts() {
		var that = this;
		that.api.events.on('proposal_open_contract', function (response) {
			var contract = response.proposal_open_contract;
			that.contractForChart = contract;
			if (contract.is_expired) {
				that.api.sellExpiredContracts();
			}
		});
	},
	observeProposal = function observeProposal(options) {
		var that = this;
		that.api.events.on('proposal', function (value) {
			if ( !purchased ) {
				if ( !purchasedContractId ) {
					if (contracts.length === 2) {
						that.contracts = [];
						that.strategyEnabled = false;
					}
				}
				that.contracts.push(value);
				if (contracts.length === 2) {
					emit('ui.log', i18n._('Contracts are ready to be purchased by the strategy'), 'info');
					that.strategyEnabled = true;
				}
			}
		});
	},
	observeAuthorize = function observeAuthorize() {
		var that = this;
		this.api.events.on('authorize', function (response) {
			if (response.error) {
				commonUtils.removeToken(token);
				showError(response.error);
			} else if (!finished) {
				observer.emit('ui.log', i18n._('Logged in to:') + ' ' + commonUtils.getAccountName(token), 'info');
				that.requestSymbolInfo(function(){
					that.getContractInfo(function () {
						that.restartContracts();
					});
					that.requestBalance();
					that.requestHistory();
					that.requestTransaction();
				});
			}
		});
	}
};