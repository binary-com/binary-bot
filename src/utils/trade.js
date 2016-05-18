var globals = require('../globals/globals');
var utils = require('./utils');
var view = require('./view');
var storageManager = require('./storageManager');
var i18n = require('i18n');
var LiveApi = require('binary-live-api')
	.LiveApi;
var Chart = require('binary-charts')
	.PlainChart;
var showError = utils.showError;
var log = utils.log;
var api = new LiveApi();
var ticks = [];
var contractForChart = null;
var symbolInfo;
var symbol;
var purchasedContractId;
var strategyEnabled;
var balance;
var balance_currency;
var contracts;
var authorizeCallback;
var lastAuthorized;
var token;
var chart;
var finished = true;

// influences display, calls on_finish
var on_contract_finish = function on_contract_finish(contract) {
	var result = (+contract.sell_price === 0) ? 'loss' : 'win';
	globals.addTradeInfo(contract);
	globals.tradeInfo.lastProfit = +(+contract.sell_price - +contract.buy_price)
		.toFixed(2);
	globals.tradeInfo.totalStake = +(+globals.tradeInfo.totalStake + (+contract.buy_price))
		.toFixed(2);
	globals.tradeInfo.totalPayout = +(+globals.tradeInfo.totalPayout + (+contract.sell_price))
		.toFixed(2);
	globals.tradeInfo.totalProfit = +(+globals.tradeInfo.totalProfit + (+globals.tradeInfo.lastProfit))
		.toFixed(2);
	globals.tradeInfo.lastResult = result;
	globals.updateTradeInfo();

	var detail_list = [
		contract.transaction_ids.buy, +contract.buy_price, +contract.sell_price,
		globals.tradeInfo.lastProfit,
		contract.contract_type, +contract.entry_tick,
		utils.getUTCTime(new Date(parseInt(contract.entry_tick_time + '000'))), +contract.exit_tick,
		utils.getUTCTime(new Date(parseInt(contract.exit_tick_time + '000'))), +((contract.barrier) ? contract.barrier : 0),
	];

	log(i18n._('Purchase was finished, result is:') + ' ' + result, (result === 'win') ? 'success' : 'error');

	globals.on_finish(result, detail_list);
	purchasedContractId = null;
	contractForChart = null;
	finished = true;
	globals.disableRun(false);
};

var updateChart = function updateChart() {
	var chartOptions = {
		ticks: ticks,
		trade: contractForChart,
	};
	if (!chart) {
		chartOptions.pipSize = +(+symbolInfo.pip)
			.toExponential()
			.substring(3);
		chart = Chart('chart', chartOptions);
	} else {
		chart.updateChart(chartOptions);
	}
};

var on_contract_update = function on_contract_update(contract) {
	contractForChart = contract;
};

var callStrategy = function callStrategy() {
	if (strategyEnabled) {
		var direction = '';
		if (ticks.length > 1) {
			if (+ticks.slice(-1)[0].quote > +ticks.slice(-2)
				.quote) {
				direction = 'up';
			} else if (+ticks.slice(-1)[0].quote < +ticks.slice(-2)
				.quote) {
				direction = 'down';
			}
		}
		globals.on_strategy(+ticks.slice(-1)[0].quote, direction);
	}
};

var getTotalProfit = function getTotalProfit() {
	return +globals.tradeInfo.totalProfit;
};

var getBalance = function getBalance(balance_type) {
	if (!isNaN(parseFloat(balance))) {
		return (balance_type === 'NUM') ? parseFloat(balance) : balance_currency + ' ' + parseFloat(balance);
	} else {
		return 0;
	}
};

var findToken = function findToken(token) {
	var index = -1;
	globals.lists.accounts.forEach(function (tokenInfo, i) {
		if (tokenInfo[1] === token) {
			index = i;
		}
	});
	return index;
};

var removeToken = function removeToken(token) {
	storageManager.removeToken(token);
	view.updateTokenList();
};

var logout = function logout() {
	storageManager.removeAllTokens();
	view.updateTokenList();
	log(i18n._('Logged you out!'), 'info');
};

var addAccount = function addAccount(token) {
	var index = findToken(token);
	if (index >= 0) {
		log(i18n._('Token already added.'), 'info');
		return;
	}
	if (token === '') {
		showError(i18n._('Token cannot be empty'));
	} else if (token !== null) {
		var api = new LiveApi();
		api.authorize(token)
			.then(function (response) {
				api.disconnect();
				storageManager.addToken(token, response.authorize.loginid);
				view.updateTokenList(token);
				log(i18n._('Your token was added successfully'), 'info');
			}, function (reason) {
				api.disconnect();
				removeToken(token);
				showError(i18n._('Authentication failed using token:') + ' ' + token);
			});
	}
};

var updateBalance = function updateBalance(data) {
	balance = data.balance;
	balance_currency = data.currency;
	globals.tradeInfo.balance = balance_currency + ' ' + parseFloat(balance);
	globals.updateTradeInfo();
};

var requestBalance = function requestBalance() {
	api.send({
			balance: 1,
		})
		.then(function (response) {
			updateBalance(response.balance);
		}, function (reason) {
			log(i18n._('Could not get balance'));
		});
};

var observeTicks = function observeTicks() {
	api.events.on('tick', function (feed) {
		log(i18n._('tick received at:') + ' ' + feed.tick.epoch);
		ticks = ticks.concat({
			epoch: +feed.tick.epoch,
			quote: +feed.tick.quote,
		});
		updateChart();
		callStrategy();
	});

	api.events.on('history', function (feed) {
		ticks = [];
		feed.history.times.forEach(function (time, index) {
			ticks.push({
				epoch: +time,
				quote: +feed.history.prices[index]
			});
		});
	});
};

var requestHistory = function requestHistory() {
	api.getTickHistory(symbol, {
			"end": "latest",
			"count": 600,
			"subscribe": 1
		})
		.then(function (value) {
			log(i18n._('Request received for history'));
		}, function (reason) {
			log(reason);
			reconnect();
		});
};

var requestTransaction = function requestTransaction() {
	api.subscribeToTransactions();
};

var observeTransaction = function observeTransaction() {
	api.events.on('transaction', function (response) {
		var transaction = response.transaction;
		updateBalance(transaction);
		if (transaction.contract_id === purchasedContractId) {
			if (transaction.action === 'buy') {
				api.unsubscribeFromAllProposals()
					.then(function () {
						contracts = [];
					});
			}
		}
	});
};

var checkBought = function checkBought(contract) {
	return (contract !== null && (!contract.hasOwnProperty('is_sold') || contract.is_sold === 1));
};

var observeOpenContracts = function observeOpenContracts() {
	api.events.on('proposal_open_contract', function (response) {
		if ( purchasedContractId ) {
			var contract = response.proposal_open_contract;
			on_contract_update(contract);
			if (contract.is_valid_to_sell === 1){
				getContractInfo();
			}
		}
	});
};

var observeProposal = function observeProposal(options) {
	api.events.on('proposal', function (value) {
		if (contracts.length === 2) {
			contracts = [];
			strategyEnabled = false;
		}
		contracts.push(value);
		if (contracts.length === 2) {
			log(i18n._('Contracts are ready to be purchased by the strategy'), 'info');
			strategyEnabled = true;
		}
	});
};

var submitProposal = function submitProposal(options) {
	api.subscribeToPriceForContractProposal(options)
		.then(function (value) {}, function (reason) {
			stop();
			showError(reason);
		});
};

var getContractInfo = function getContractInfo(callback) {
	api.send({
			proposal_open_contract: 1,
			contract_id: purchasedContractId,
		})
		.then(function (response) {
			var contract = response.proposal_open_contract;
			if (contract.hasOwnProperty('sell_price')) {
				on_contract_finish(contract);
				if (callback) {
					callback(contract);
				}
			}
		}, function (reason) {
			showError(reason);
			reconnect();
		});
};

var purchase = function purchase(option) {
	strategyEnabled = false;
	var proposalContract = (option === contracts[1].echo_req.contract_type) ? contracts[1] : contracts[0];
	log(i18n._('Purchased') + ': ' + proposalContract.proposal.longcode, 'info');
	api.buyContract(proposalContract.proposal.id, proposalContract.proposal.ask_price)
		.then(function (purchaseContract) {
			purchasedContractId = purchaseContract.buy.contract_id;
			api.subscribeToOpenContract(purchasedContractId);
			globals.tradeInfo.numOfRuns++;
			globals.updateTradeInfo();
			globals.disableRun(true);
		}, function (reason) {
			stop();
			showError(reason);
		});
};

var restartContracts = function restartContracts() {
	strategyEnabled = false;
	api.unsubscribeFromAllProposals()
		.then(function (response) {
			authorizeCallback();
		}, function (reason) {
			showError(reason);
		});
};

var observeAuthorize = function observeAuthorize() {
	api.events.on('authorize', function (response) {
		if (response.error) {
			showError(response.error);
		} else if ( !finished ) {
			var now = parseInt((new Date()
				.getTime()) / 1000);
			if (lastAuthorized === undefined || now - lastAuthorized >= 1) { // prevent live-api to call this many times in case of disconnect
				lastAuthorized = now;
				log(i18n._('Authenticated using token:') + ' ' + token, 'info');
				if (purchasedContractId) {
					getContractInfo(function () {
						restartContracts();
					});
				} else {
					restartContracts();
				}
				requestBalance();
				requestHistory();
				requestTransaction();
				requestSymbolInfo();
			}
		}
	});
};

var reconnect = function reconnect() {
	stop();
	api.token = token;
	api.connect();
	api.authorize(token);
};

var stop = function stop() {
	if (api) {
		try {
			api.disconnect();
			chart = null;
		} catch (e) {}
	}
};

var requestSymbolInfo = function requestSymbolInfo(callback) {
	api.getActiveSymbolsBrief()
		.then(function (response) {
			var symbols = response.active_symbols;
			symbols.forEach(function (_symbolInfo) {
				if (_symbolInfo.symbol === symbol) {
					symbolInfo = _symbolInfo;
					if (callback) {
						callback();
					}
				}
			});
		});
};

var setSymbol = function setSymbol(_symbol) {
	symbol = _symbol;
};

var trade = function trade(_token, callback, trade_again) {
	if (token === '') {
		showError(i18n._('No token is available to authenticate'));
	} else {
		finished = false;
		authorizeCallback = callback;
		purchasedContractId = null;
		globals.disableRun(false);
		contracts = [];
		chart = null;
		if (trade_again) {
			restartContracts();
		} else {
			token = _token;
			stop();
			api = new LiveApi();
			observeTicks();
			observeProposal();
			observeTransaction();
			observeOpenContracts();
			observeAuthorize();
			api.authorize(token);
		}
	}
};

module.exports = {
	addAccount: addAccount,
	stop: stop,
	logout: logout,
	getTotalProfit: getTotalProfit,
	getBalance: getBalance,
	submitProposal: submitProposal,
	purchase: purchase,
	setSymbol: setSymbol,
	trade: trade,
};
