(function(){
	var showError = Bot.utils.showError;
	var log = Bot.utils.log;
	var LiveApi = window['binary-live-api'].LiveApi;
	Bot.server = {}; 
	Bot.server.state = 'STOPPED';

	Bot.server.updateTickTime = function updateTickTime(){
		Bot.server.lastTickTime = parseInt((new Date().getTime())/1000);
	};

	// depends on reconnect, tickExpected and updateTickTime
	setInterval(function(){
		var now = parseInt((new Date().getTime())/1000);
		if ( Bot.server.tickExpected ) {
			if ( now - Bot.server.lastTickTime > 20 ) {
				Bot.server.lastTickTime = now;
				Bot.server.reconnect();
			}
		}
	}, 2000);

	// influences globals, calls on_finish
	Bot.server.listen_on_contract_finish = function listen_on_contract_finish(e){
		Bot.server.state = 'FINISHED';
		var contract = e.detail.contract;
		Bot.addTrade(contract);
		var payout = (contract.result !== 'win' )? 0 : +contract.payout;
		Bot.globals.lastProfit = +(payout - +contract.askPrice).toFixed(2);
		Bot.globals.totalStake = +(+Bot.globals.totalStake + +contract.askPrice).toFixed(2);
		Bot.globals.totalPayout = +(+Bot.globals.totalPayout + payout).toFixed(2);
		Bot.globals.totalProfit = +(+Bot.globals.totalProfit + +Bot.globals.lastProfit).toFixed(2);
		Bot.globals.lastResult = contract.result;
		Bot.updateGlobals();

		var detail_list = [
			contract.statement, 
			+contract.askPrice, 
			+payout, 
			Bot.globals.lastProfit,
			contract.type, 
			+contract.entrySpot, 
			Bot.utils.getUTCTime(new Date(parseInt(contract.entrySpotTime + '000'))),
			+contract.exitSpot, 
			Bot.utils.getUTCTime(new Date(parseInt(contract.exitSpotTime + '000'))),
			+( (contract.barrier) ? contract.barrier : 0 ),
		];

		log('Purchase was finished, result is: ' + contract.result, (contract.result === 'win')? 'success': 'error');

		Bot.on_finish(contract.result, detail_list);
		Bot.server.listen_on_contract_update(e);
		Bot.server.purchaseNotDone = false;
		Bot.disableRun(false);
		Bot.server.requestBalance();
	};

	Bot.server.listen_on_contract_update = function listen_on_contract_update(e){
		Bot.server.contractForChart = {
			barrier: e.detail.contract.barrier,
			barrierType: 'absolute',
			entry_tick_time: e.detail.contract.entrySpotTime,
			contract_type: e.detail.contract.type,
		};
		if ( e.detail.contract.exitSpotTime ) {
			Bot.server.contractForChart.exit_tick_time = e.detail.contract.exitSpotTime;
		} else {
			if ( Bot.server.portfolioContract ) {
				Bot.server.contractForChart.date_expiry = Bot.server.portfolioContract.expiry_time;
			}
		}
		var ticks = [];
		Bot.server.contractService.getTicks().forEach(function(tick){
			ticks.push({
				epoch: +tick.time,
				quote: +tick.price,
			});
		});
		Bot.chart.updateChart({ticks: ticks, contract: Bot.server.contractForChart});
	};

	// actions needed on a tick received from the contract service
	Bot.server.listen_on_tick_update = function listen_on_tick_update(e){
		Bot.server.updateTickTime();
		var ticks = [];
		Bot.server.contractService.getTicks().forEach(function(tick){
			ticks.push({
				epoch: +tick.time,
				quote: +tick.price,
			});
		});
		if ( Bot.server.purchaseNotDone && Bot.server.contractForChart ) {
			Bot.chart.updateChart({ticks: ticks, contract: Bot.server.contractForChart});
		} else {
			Bot.chart.updateChart({ticks: ticks});
		}
		Bot.utils.broadcast('strategy:updated', e.detail);
	};

	// calls on_strategy
	Bot.server.listen_on_strategy = function listen_on_strategy(e){
		Bot.on_strategy(e.detail.tick, e.detail.direction);
	};

	// maps a function to an event
	Bot.server.listen_on = function listen_on(eventName, functionName){
		window.addEventListener(eventName, functionName);
	};

	Bot.server.accounts = [['Please add a token first', '']];
	Bot.server.purchase_choices = [['Click to select', '']];

	Bot.server.getAccounts = function getAccounts(){
		return Bot.server.accounts;
	};

	Bot.server.getPurchaseChoices = function getPurchaseChoices(){
		return Bot.server.purchase_choices;
	};

	Bot.server.getTotalProfit = function getTotalProfit(){
		return +Bot.globals.totalProfit;
	};

	Bot.server.getBalance = function getBalance(balance_type){
		if ( !isNaN(parseFloat(Bot.server.balance)) ) {
			return (balance_type === 'NUM')? parseFloat(Bot.server.balance) : Bot.server.balance_currency + ' ' + parseFloat(Bot.server.balance) ;
		} else {
			return 0;
		}
	};

	Bot.server.findToken = function findToken(token){
		var index = -1;
		Bot.server.accounts.forEach(function(tokenInfo, i){
			if ( tokenInfo[1] === token ) {
				index = i;
			}	
		});	
		return index;
	};

	Bot.server.removeToken = function removeToken(token){
		var index = Bot.server.findToken(token);
		Bot.utils.getStorageManager().removeToken(token);
		Bot.utils.updateTokenList();
	};

	Bot.server.logout = function logout(){
		Bot.utils.getStorageManager().removeAllTokens();
		Bot.utils.updateTokenList();
		log('Logged you out!', 'info');
	};

	Bot.server.addAccount = function addAccount(token){
		var index = Bot.server.findToken(token);
		if ( index >= 0 ) {
			log('Token already added.', 'info');
			return;
		}
		if ( token === '' ) {
			showError('Token cannot be empty');
		} else if ( token !== null ) {
			var api = new LiveApi();
			api.authorize(token).then(function(response){
				api.disconnect();
				Bot.utils.getStorageManager().addToken(token, response.authorize.loginid);
				Bot.utils.updateTokenList(token);
				log('Your token was added successfully', 'info');
			}, function(reason){
				api.disconnect();
				Bot.server.removeToken(token);
				showError('Authentication using token: ' + token + ' failed!');
			});
		}
	};

	Bot.server.updateBalance = function updateBalance(data){
		Bot.server.balance = data.balance;
		if ( data.currency ) {
			Bot.server.balance_currency = data.currency;
		}
		Bot.globals.balance = Bot.server.balance_currency + ' ' + parseFloat(Bot.server.balance);
	};

	Bot.server.observeTransaction = function observeTransaction(){
		Bot.server.api.events.on('transaction', function (response) {
			if ( response.transaction.action ) {
				Bot.server.updateBalance(response.transaction);
			}
		});
	};

	Bot.server.requestBalance = function requestBalance(){
		Bot.server.api.send({
			balance: 1,
		}).then(function(response){
			Bot.server.updateBalance(response.balance);
		}, function(reason){
			log('Could not get balance');
		});
	};

	Bot.server.requestTransaction = function requestTransaction(){
		Bot.server.api.send({
			"transaction": 1,
			"subscribe": 1
		}).then(function(response){
		}, function(reason){
			showError('Could not subscribe to transaction');
		});
	};

	Bot.server.observeTicks = function observeTicks(){
		Bot.server.api.events.on('tick', function (feed) {
			log('tick received at: ' + feed.tick.epoch);
			Bot.server.contractService.addTick(feed.tick);
		});

		Bot.server.api.events.on('history', function (feed) {
			Bot.server.contractService.addHistory(feed.history);
		});
	};

	Bot.server.forgetAllTicks = function forgetAllTicks(callback){
		Bot.server.tickExpected = false;
		Bot.server.api.send({
			forget_all: 'ticks',
		}).then(function(response){
			if ( callback ) {
				callback();
			}
		}, function(reason){
			log(reason);
		});
	};

	Bot.server.subscribeToTick = function subscribeToTick(callback){
		Bot.server.tickExpected = true;
		Bot.server.api.send({
			ticks: Bot.server.symbol,
		}).then(function(response){
			if ( callback ) {
				callback();
			}
		}, function(reason){
			log(reason);
			Bot.server.reconnect();
		});
	};

	Bot.server.requestHistory = function requestHistory(callback){
		Bot.server.api.getTickHistory(Bot.server.symbol,{
			"end": "latest",
			"count": Bot.server.contractService.getCapacity(),
		}).then(function(value){
			log('Request receieved for history');
			if ( callback ) {
				callback();
			}
		}, function(reason){
			log(reason);
			Bot.server.reconnect();
		});
	};

	Bot.server.resubscribe = function resubscribe(callback){
		Bot.server.forgetAllTicks(function(){
			Bot.server.subscribeToTick(function(){
				Bot.server.requestHistory(function(){
					if ( callback ) {
						callback();
					}
				});
			});
		});
	};

	Bot.server.submitProposal = function submitProposal(options, callback, first){
		if ( first ) {
			Bot.server.contracts = [];
		}
		Bot.server.api.getPriceProposalForContract(options).then(function(value){
			Bot.server.state = 'PROPOSAL_SUBMITTED';
			Bot.globals.stake = +(+value.proposal.ask_price).toFixed(2);
			Bot.globals.payout = +(+value.proposal.payout).toFixed(2);
			Bot.updateGlobals();
			log('contract added: ' + value.proposal.longcode);
			if ( Bot.server.contracts.length === 1 ) {
				log('Contracts are ready to be purchased by the strategy', 'info'); 
				Bot.server.listen_on('strategy:updated', Bot.server.listen_on_strategy);
			}
			Bot.server.contracts.push(value);
			if ( callback ){
				callback();
			}
		}, function(reason){
			Bot.stop();
			Bot.server.state = 'PROPOSAL_NOT_SUBMITTED';
			showError(reason);
		});
	};

	Bot.server.getContractInfo = function getContractInfo(result, contract_id, callback, reconnect){
		Bot.server.api.send({
			proposal_open_contract: 1,
			contract_id: contract_id
		}).then(function(response){
			if ( reconnect ) {
				var data = response.proposal_open_contract;
				Bot.utils.broadcast('contract:finished', {
					time: '0',
					contract: {
						result: result,
						askPrice: data.buy_price,
						statement: data.transaction_ids['buy'],
						type: data.contract_type,
						entrySpot: data.entry_tick,
						entrySpotTime: data.entry_tick_time,
						exitSpot: data.exit_tick,
						exitSpotTime: data.exit_tick_time,
						barrier: data.barrier,
						payout: data.payout,
					}
				});
			}
			if ( callback ) {
				callback(response.proposal_open_contract);
			}
		}, function(reason){
			showError(reason);
			Bot.server.reconnect();
		});	
	};

	Bot.server.getLastPurchaseInfo = function getLastPurchaseInfo(callback){
		Bot.server.api.getStatement({
			description: 1,
			limit: 1
		}).then(function(response){
			var transaction = response.statement.transactions[0];
			if ( transaction.action_type === 'buy' ) {
				Bot.server.portfolio();
			} else {
				var result;
				if ( +transaction.amount === 0 ){
					result = 'lose';
				} else {
					result = 'win';
				}
				Bot.server.getContractInfo(result, transaction.contract_id, callback, true);
			}
		}, function(reason){
			showError(reason);
			Bot.server.reconnect();
		});
	};

	Bot.server.portfolio = function portfolio(){
		if ( Bot.server.purchaseInfo === null ){
			return;
		} 
		var proposalContract = Bot.server.purchaseInfo.proposalContract;
		var purchaseContract = Bot.server.purchaseInfo.purchaseContract;
		Bot.server.api.getPortfolio().then(function(portfolio){
			var contractId = purchaseContract.buy.contract_id;
			portfolio.portfolio.contracts.forEach(function (contract) {
				if (contract.contract_id == contractId) {
					Bot.server.state = 'PORTFOLIO_RECEIVED';
					log('Waiting for the purchased contract to finish', 'info');
					Bot.server.contractService.addContract({
						statement: contract.transaction_id,
						startTime: contract.date_start + 1,
						duration: parseInt(proposalContract.echo_req.duration),
						type: contract.contract_type,
						barrier: proposalContract.echo_req.barrier,
						askPrice: parseFloat(proposalContract.proposal.ask_price),
						payout: proposalContract.proposal.payout,
					});
					Bot.server.portfolioContract = contract;
				}
			});
		}, function(reason){
			Bot.server.reconnect();
			Bot.server.state = 'PORTFOLIO_NOT_RECEIVED';
			showError(reason);
		});
	};

	Bot.server.purchase = function purchase(option){
		window.removeEventListener('strategy:updated', Bot.server.listen_on_strategy);
		var proposalContract = (option === Bot.server.contracts[1].echo_req.contract_type)? Bot.server.contracts[1] : Bot.server.contracts[0];
		log('Purchased: ' + proposalContract.proposal.longcode, 'info');
		Bot.server.api.buyContract(proposalContract.proposal.id, proposalContract.proposal.ask_price).then(function(purchaseContract){
			Bot.server.updateBalance({balance: purchaseContract.buy.balance_after});
			Bot.globals.numOfRuns++;
			Bot.updateGlobals();
			Bot.server.purchaseNotDone = true;
			Bot.disableRun(true);
			Bot.server.state = 'PURCHASED';
			Bot.server.purchaseInfo = {
				proposalContract: proposalContract,
				purchaseContract: purchaseContract,
			};
			Bot.server.portfolio();
		}, function(reason){
			Bot.stop();
			Bot.server.state = 'PURCHASE_FAILED';
			showError(reason);
		});
	};

	Bot.server.restartContracts = function restartContracts(resetOnly, callback){
		window.removeEventListener('strategy:updated', Bot.server.listen_on_strategy);
		Bot.server.purchaseInfo = null;
		if ( !resetOnly ) {
			Bot.server.authorizeCallback(function(){
				Bot.server.resubscribe(callback);
			});
		}
	};

	Bot.server.initContractService = function initContractService(){
		Bot.server.contractService = ContractService();	
		Bot.server.contractForChart = null;
	};

	Bot.server.connect = function connect(){
		Bot.server.tickExpected = true;
		Bot.server.api.events.on('authorize', function (response) {
			if ( response.error ) {
				showError(response.error);
				Bot.server.state = 'NOT_AUTHORIZED';
			} else {
				var now = parseInt((new Date().getTime())/1000);
				if ( Bot.server.lastAuthorized === undefined || now - Bot.server.lastAuthorized > 10 ) { 
					Bot.server.initContractService();
					Bot.server.lastAuthorized = now;
					log('Authenticated using token: ' + Bot.server.token , 'info');
					if ( Bot.server.firstRun ) { 
						Bot.server.firstRun = false;
						Bot.server.listen_on('tick:updated', Bot.server.listen_on_tick_update);
						Bot.server.listen_on('contract:updated', Bot.server.listen_on_contract_update);
						Bot.server.listen_on('contract:finished', Bot.server.listen_on_contract_finish);
						Bot.server.observeTicks();
						Bot.server.observeTransaction();
					}
					if ( Bot.server.purchaseNotDone ) {
						Bot.server.getLastPurchaseInfo(function(){
							Bot.server.restartContracts(false);
						});
					} else {
						Bot.server.restartContracts(false);
					}
					Bot.server.requestTransaction();
					Bot.server.requestBalance();
					Bot.server.state = 'AUTHORIZED';
				} 
			}
		});
	};

	Bot.server.reconnect = function reconnect(){
		Bot.server.restartContracts(true);
		Bot.server.stop();
		Bot.server.api.token = Bot.server.token;
		Bot.server.api.connect();
	};

	Bot.server.reset = function reset(){
		Bot.resetGlobals();
		Bot.utils.log('Reset successful', 'success');
	};

	Bot.server.stop = function stop(){
		Bot.server.tickExpected = false;
		if ( Bot.server.api ) {
			try {
				Bot.server.api.disconnect();
				Bot.server.state = 'STOPPED';
				Bot.server.purchaseNotDone = false;
				Bot.disableRun(false);
			} catch(e){
			}
		}
	};

	Bot.server.trade = function trade(token, callback, trade_again){
		if ( token === '' ) {
			showError('No token is available to authenticate');
		} else {
			Bot.server.updateTickTime();
			Bot.server.authorizeCallback = callback;
			Bot.server.purchaseNotDone = false;
			Bot.disableRun(false);
			if ( trade_again ) {
				Bot.server.state = 'TRADE_AGAIN';
				Bot.server.restartContracts(false);
			} else {
				Bot.server.token = token;
				Bot.server.stop();
				Bot.server.api = new LiveApi();
				Bot.server.state = 'INITIALIZED';
				Bot.server.firstRun = true;
				Bot.server.api.authorize(Bot.server.token);
				Bot.server.connect();
			}
		}
	};

	/*
	 Order of calls:
	 trade [-> authorize] -> restartContracts -> submitProposal -> subscribeToTick -> on_strategy -> purchase -> portfolio -> contract_finished
	 */

})();
