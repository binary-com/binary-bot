Bot.Trade = function () {
	var showError = Bot.utils.showError;
	var log = Bot.utils.log;
	var LiveApi = window['binary-live-api'].LiveApi;
	Bot.server = {};
	Bot.server.ticks = [];
	Bot.server.contractForChart = null; 

	// influences display, calls on_finish
	Bot.server.on_contract_finish = function on_contract_finish(contract) {
		Bot.addTrade(contract);
		var payout = (contract.result !== 'win') ? 0 : +contract.payout;
		Bot.display.lastProfit = +(payout - +contract.askPrice)
			.toFixed(2);
		Bot.display.totalStake = +(+Bot.display.totalStake + (+contract.askPrice))
			.toFixed(2);
		Bot.display.totalPayout = +(+Bot.display.totalPayout + payout)
			.toFixed(2);
		Bot.display.totalProfit = +(+Bot.display.totalProfit + (+Bot.display.lastProfit))
			.toFixed(2);
		Bot.display.lastResult = contract.result;
		Bot.updateDisplay();

		var detail_list = [
			contract.statement, +contract.askPrice, +payout,
			Bot.display.lastProfit,
			contract.type, +contract.entrySpot,
			Bot.utils.getUTCTime(new Date(parseInt(contract.entrySpotTime + '000'))), +contract.exitSpot,
			Bot.utils.getUTCTime(new Date(parseInt(contract.exitSpotTime + '000'))), +((contract.barrier) ? contract.barrier : 0),
		];

		log(i18n._('Purchase was finished, result is:') + ' ' + contract.result, (contract.result === 'win') ? 'success' : 'error');

		Bot.on_finish(contract.result, detail_list);
		Bot.server.purchaseNotDone = false;
		Bot.server.contractForChart = null;
		Bot.disableRun(false);
	};

	Bot.server.updateChart = function updateChart(){
		var contract;
		if ( Bot.server.contractForChart ) {
			contract = {
				barrier: Bot.server.contractForChart.barrier,
				entry_tick_time: Bot.server.contractForChart.entry_tick_time,
				contract_type: Bot.server.contractForChart.contract_type,
			};
			if ( Bot.server.contractForChart.exit_tick_time ) {
				contract.exit_tick_time = Bot.server.contractForChart.exit_tick_time;
			} else {
				contract.date_expiry = Bot.server.contractForChart.date_expiry;
			}
		}
		Bot.chart.updateChart({
			ticks: Bot.server.ticks,
			contract: contract
		});
	};

	Bot.server.on_contract_update = function on_contract_update(contract) {
		Bot.server.contractForChart = contract;
		Bot.server.updateChart();
	};

	Bot.server.callStrategy = function callStrategy() {
		if ( Bot.server.strategyEnabled ) {
			var direction = '';
			if ( Bot.server.ticks.length > 1 ) {
				if ( +Bot.server.ticks.slice(-1)[0].quote > +Bot.server.ticks.slice(-2).quote ) {
					direction = 'up';
				} else if ( +Bot.server.ticks.slice(-1)[0].quote < +Bot.server.ticks.slice(-2).quote ) {
					direction = 'down';
				} 
			}
			Bot.on_strategy(+Bot.server.ticks.slice(-1)[0].quote, direction);
		}
	};

	Bot.server.accounts = [
		[i18n._('Please add a token first'), '']
	];
	Bot.server.purchase_choices = [
		[i18n._('Click to select'), '']
	];

	Bot.server.getAccounts = function getAccounts() {
		return Bot.server.accounts;
	};

	Bot.server.getPurchaseChoices = function getPurchaseChoices() {
		return Bot.server.purchase_choices;
	};

	Bot.server.getTotalProfit = function getTotalProfit() {
		return +Bot.display.totalProfit;
	};

	Bot.server.getBalance = function getBalance(balance_type) {
		if (!isNaN(parseFloat(Bot.server.balance))) {
			return (balance_type === 'NUM') ? parseFloat(Bot.server.balance) : Bot.server.balance_currency + ' ' + parseFloat(Bot.server.balance);
		} else {
			return 0;
		}
	};

	Bot.server.findToken = function findToken(token) {
		var index = -1;
		Bot.server.accounts.forEach(function (tokenInfo, i) {
			if (tokenInfo[1] === token) {
				index = i;
			}
		});
		return index;
	};

	Bot.server.removeToken = function removeToken(token) {
		var index = Bot.server.findToken(token);
		Bot.utils.getStorageManager()
			.removeToken(token);
		Bot.utils.updateTokenList();
	};

	Bot.server.logout = function logout() {
		Bot.utils.getStorageManager()
			.removeAllTokens();
		Bot.utils.updateTokenList();
		log(i18n._('Logged you out!'), 'info');
	};

	Bot.server.addAccount = function addAccount(token) {
		var index = Bot.server.findToken(token);
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
					Bot.utils.getStorageManager()
						.addToken(token, response.authorize.loginid);
					Bot.utils.updateTokenList(token);
					log(i18n._('Your token was added successfully'), 'info');
				}, function (reason) {
					api.disconnect();
					Bot.server.removeToken(token);
					showError(i18n._('Authentication failed using token:') + ' ' + token);
				});
		}
	};

	Bot.server.updateBalance = function updateBalance(data) {
		Bot.server.balance = data.balance;
		Bot.server.balance_currency = data.currency;
		Bot.display.balance = Bot.server.balance_currency + ' ' + parseFloat(Bot.server.balance);
		Bot.updateDisplay();
	};

	Bot.server.requestBalance = function requestBalance() {
		Bot.server.api.send({
				balance: 1,
			})
			.then(function (response) {
				Bot.server.updateBalance(response.balance);
			}, function (reason) {
				log(i18n._('Could not get balance'));
			});
	};

	Bot.server.observeTicks = function observeTicks() {
		Bot.server.api.events.on('tick', function (feed) {
			log(i18n._('tick received at:') + ' ' + feed.tick.epoch);
			Bot.server.ticks = Bot.server.ticks.concat({
				epoch: +feed.tick.epoch,
				quote: +feed.tick.quote,
			});
			Bot.server.updateChart();
			Bot.server.callStrategy();
		});

		Bot.server.api.events.on('history', function (feed) {
			Bot.server.ticks = [];
			feed.history.times.forEach(function(time, index){
				Bot.server.ticks.push({
					epoch: +time,
					quote: +feed.history.prices[index]
				});
			});
		});
	};

	Bot.server.requestHistory = function requestHistory() {
		Bot.server.api.getTickHistory(Bot.server.symbol, {
				"end": "latest",
				"count": 600,
				"subscribe": 1
			})
			.then(function (value) {
				log(i18n._('Request received for history'));
			}, function (reason) {
				log(reason);
				Bot.server.reconnect();
			});
	};

	Bot.server.requestTransaction = function requestTransaction() {
		Bot.server.api.subscribeToTransactions();
	};

	Bot.server.observeTransaction = function observeTransaction() {
		Bot.server.api.events.on('transaction', function(response) {
			var transaction = response.transaction;
			Bot.server.updateBalance(transaction);
			if ( transaction.action === 'sell' ) {
				var result;
				if (+transaction.amount === 0) {
					result = 'loss';
				} else {
					result = 'win';
				}
				Bot.server.getContractInfo(result, transaction.contract_id, null);
			} else if ( transaction.action === 'buy' ) {
				Bot.server.api.unsubscribeFromAllProposals().then(function(){
					Bot.server.contracts = [];
					Bot.server.api.subscribeToOpenContract(transaction.contract_id);
				});
			}
		});
	};

	Bot.server.observeOpenContracts = function observeOpenContracts() {
		Bot.server.api.events.on('proposal_open_contract', function(response) {
			Bot.server.on_contract_update(response.proposal_open_contract);
		});
	};

	Bot.server.observeProposal = function observeProposal(options) {
		Bot.server.api.events.on('proposal', function (value) {
			if (Bot.server.contracts.length === 2) {
				Bot.server.contracts = [];
				Bot.server.strategyEnabled = false;
			}
			Bot.server.contracts.push(value);
			if (Bot.server.contracts.length === 2) {
				log(i18n._('Contracts are ready to be purchased by the strategy'), 'info');
				Bot.server.strategyEnabled = true;
			}
		});
	};

	Bot.server.submitProposal = function submitProposal(options) {
		Bot.server.api.subscribeToPriceForContractProposal(options)
			.then(function (value) {}, function (reason) {
				Bot.stop();
				showError(reason);
			});
	};

	Bot.server.getContractInfo = function getContractInfo(result, contract_id, callback) {
		Bot.server.api.send({
				proposal_open_contract: 1,
				contract_id: contract_id
			})
			.then(function (response) {
				var data = response.proposal_open_contract;
				Bot.server.on_contract_finish({
					result: result,
					askPrice: data.buy_price,
					statement: data.transaction_ids.buy,
					type: data.contract_type,
					entrySpot: data.entry_tick,
					entrySpotTime: data.entry_tick_time,
					exitSpot: data.exit_tick,
					exitSpotTime: data.exit_tick_time,
					barrier: data.barrier,
					payout: data.payout,
				});
				if (callback) {
					callback(response.proposal_open_contract);
				}
			}, function (reason) {
				showError(reason);
				Bot.server.reconnect();
			});
	};

	Bot.server.getLastPurchaseInfo = function getLastPurchaseInfo(callback) {
		Bot.server.api.getStatement({
				description: 1,
				limit: 1
			})
			.then(function (response) {
				var transaction = response.statement.transactions[0];
				if (transaction.action_type === 'sell') {
					var result;
					if (+transaction.amount === 0) {
						result = 'loss';
					} else {
						result = 'win';
					}
					Bot.server.getContractInfo(result, transaction.contract_id, callback);
				}
			}, function (reason) {
				showError(reason);
				Bot.server.reconnect();
			});
	};

	Bot.server.purchase = function purchase(option) {
		Bot.server.strategyEnabled = false;
		var proposalContract = (option === Bot.server.contracts[1].echo_req.contract_type) ? Bot.server.contracts[1] : Bot.server.contracts[0];
		log(i18n._('Purchased') + ': ' + proposalContract.proposal.longcode, 'info');
		Bot.server.api.buyContract(proposalContract.proposal.id, proposalContract.proposal.ask_price)
			.then(function (purchaseContract) {
				Bot.server.purchaseNotDone = true;
				Bot.display.numOfRuns++;
				Bot.updateDisplay();
				Bot.disableRun(true);
			}, function (reason) {
				Bot.stop();
				showError(reason);
			});
	};

	Bot.server.restartContracts = function restartContracts() {
		Bot.server.strategyEnabled = false;
		Bot.server.api.unsubscribeFromAllProposals()
			.then(function (response) {
				Bot.server.authorizeCallback();
			}, function (reason) {
				showError(reason);
			});
	};

	Bot.server.observeAuthorize = function observeAuthorize() {
		Bot.server.api.events.on('authorize', function (response) {
			if (response.error) {
				showError(response.error);
			} else {
				var now = parseInt((new Date()
					.getTime()) / 1000);
				if (Bot.server.lastAuthorized === undefined || now - Bot.server.lastAuthorized >= 1) { // prevent live-api to call this many times in case of disconnect
					Bot.server.lastAuthorized = now;
					log(i18n._('Authenticated using token:') + ' ' + Bot.server.token, 'info');
					if (Bot.server.purchaseNotDone) {
						Bot.server.getLastPurchaseInfo(function () {
							Bot.server.restartContracts();
						});
					} else {
						Bot.server.restartContracts();
					}
					Bot.server.requestBalance();
					Bot.server.requestHistory();
					Bot.server.requestTransaction();
				}
			}
		});
	};

	Bot.server.reconnect = function reconnect() {
		Bot.server.stop();
		Bot.server.api.token = Bot.server.token;
		Bot.server.api.connect();
		Bot.server.api.authorize(Bot.server.token);
	};

	Bot.server.stop = function stop() {
		if (Bot.server.api) {
			try {
				Bot.server.api.disconnect();
				Bot.disableRun(false);
			} catch (e) {}
		}
	};

	Bot.server.trade = function trade(token, callback, trade_again) {
		if (token === '') {
			showError(i18n._('No token is available to authenticate'));
		} else {
			Bot.server.authorizeCallback = callback;
			Bot.server.purchaseNotDone = false;
			Bot.disableRun(false);
			Bot.server.contracts = [];
			if (trade_again) {
				Bot.server.restartContracts();
			} else {
				Bot.server.token = token;
				Bot.server.stop();
				Bot.server.api = new LiveApi();
				Bot.server.observeTicks();
				Bot.server.observeProposal();
				Bot.server.observeTransaction();
				Bot.server.observeOpenContracts();
				Bot.server.observeAuthorize();
				Bot.server.api.authorize(Bot.server.token);
			}
		}
	};

	/*
	 Order of calls:
	 trade [-> authorize] ->  do subscriptions -> submitProposal -> callStrategy -> purchase -> contract_finished
	 */

};
