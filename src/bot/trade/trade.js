var globals = require('../globals/globals');
var botUtils = require('../utils/utils');
var commonUtils = require('utils');
var view = require('../view');
var i18n = require('i18n');
var appId = require('appId');
var LiveApi = require('binary-live-api')
	.LiveApi;
var Chart = require('binary-charts')
	.PlainChart;
var showError = botUtils.showError;
var log = botUtils.log;
var api;
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
var token;
var chart;
var finished = true;
var purchased = false;

// influences display, calls on_finish
var contractFinished = function contractFinished(contract) {
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
		botUtils.getUTCTime(new Date(parseInt(contract.entry_tick_time + '000'))), +contract.exit_tick,
		botUtils.getUTCTime(new Date(parseInt(contract.exit_tick_time + '000'))), +((contract.barrier) ? contract.barrier : 0),
	];

	log(i18n._('Purchase was finished, result is:') + ' ' + result, (result === 'win') ? 'success' : 'error');

	globals.on_finish(result, detail_list);
	purchasedContractId = '';
	contractForChart = null;
	finished = true;
	globals.disableRun(false);
};

var updateChart = function updateChart() {
	var chartOptions = {
		type: 'area',
		ticks: ticks,
	};
	if (contractForChart) {
		chartOptions.contract = contractForChart;
	}
	if (!chart) {
		chartOptions.pipSize = +(+symbolInfo.pip)
			.toExponential()
			.substring(3);
		chart = Chart('chart', chartOptions);
	} else {
		chart.updateChart(chartOptions);
	}
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

var updateBalance = function updateBalance(data) {
	if (data.balance && data.currency) {
		balance = data.balance;
		balance_currency = data.currency;
		globals.tradeInfo.balance = balance_currency + ' ' + parseFloat(balance);
		globals.updateTradeInfo();
	}
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
		log(transaction);
		if (transaction.contract_id === purchasedContractId) {
			if (transaction.action === 'buy') {
				api.unsubscribeFromAllProposals();
			} else if (transaction.action === 'sell') {
				getContractInfo();
			}
		}
	});
};

var observeOpenContracts = function observeOpenContracts() {
	api.events.on('proposal_open_contract', function (response) {
		var contract = response.proposal_open_contract;
		contractForChart = contract;
		if (contract.is_expired) {
			api.sellExpiredContracts();
		}
	});
};

var observeProposal = function observeProposal(options) {
	api.events.on('proposal', function (value) {
		if ( !purchased ) {
			if ( !purchasedContractId ) {
				if (contracts.length === 2) {
					contracts = [];
					strategyEnabled = false;
				}
			}
			contracts.push(value);
			if (contracts.length === 2) {
				log(i18n._('Contracts are ready to be purchased by the strategy'), 'info');
				strategyEnabled = true;
			}
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
	if (purchasedContractId !== '') {
		api.send({
				proposal_open_contract: 1,
				contract_id: purchasedContractId,
			})
			.then(function (response) {
				var contract = response.proposal_open_contract;
				if (contract.hasOwnProperty('sell_price')) {
					contractFinished(contract);
					if (callback) {
						callback(contract);
					}
				}
			}, function (reason) {
				showError(reason);
				reconnect();
			});
	} else {
		if (callback) {
			callback();
		}
	}
};

var purchase = function purchase(option) {
	purchased = true;
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
			commonUtils.removeToken(token);
			showError(response.error);
		} else if (!finished) {
			log(i18n._('Logged in to:') + ' ' + commonUtils.getAccountName(token), 'info');
			requestSymbolInfo(function(){
				getContractInfo(function () {
					restartContracts();
				});
				requestBalance();
				requestHistory();
				requestTransaction();
			});
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
	if (_token === '') {
		showError(i18n._('No token is available to authenticate'));
	} else {
		finished = false;
		purchased = false;
		authorizeCallback = callback;
		purchasedContractId = '';
		globals.disableRun(false);
		contracts = [];
		chart = null;
		if (trade_again) {
			restartContracts();
		} else {
			token = _token;
			api = new LiveApi({ appId: appId.getAppId() });
			observeTicks();
			observeProposal();
			observeTransaction();
			observeOpenContracts();
			observeAuthorize();
			api.authorize(token);
		}
	}
};

globals.disableRun(false);

module.exports = {
	stop: stop,
	getTotalProfit: getTotalProfit,
	getBalance: getBalance,
	submitProposal: submitProposal,
	purchase: purchase,
	setSymbol: setSymbol,
	trade: trade,
};
