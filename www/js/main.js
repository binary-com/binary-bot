(function(){
	var showError = Bot.utils.showError;
	var log = Bot.utils.log;
	var LiveApi = window['binary-live-api'].LiveApi;
	Bot.server = {}; 

	Bot.server.state = 'STOPPED';
	window.addEventListener('contract:finished', function(e){
		Bot.server.state = 'FINISHED';
		var contract = e.detail.contract;
		Bot.addResult(e.detail.time, contract.result);
		var payout = (contract.result !== 'win' )? 0 : +contract.payout;
		Bot.globals.lastProfit = +(payout - +contract.askPrice).toFixed(2);
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
			new Date(parseInt(contract.entrySpotTime + '000')).toLocaleTimeString(),
			+contract.exitSpot, 
			new Date(parseInt(contract.exitSpotTime + '000')).toLocaleTimeString(),
			+contract.barrier,
		];
		log('Purchase was finished, result is: ' + contract.result, (contract.result === 'win')? 'success': 'error');
		Bot.on_finish(contract.result, detail_list);
	});

	window.addEventListener('contract:updated', function(e){
		Bot.addResult(e.detail.time, e.detail.contract.result);
	});

	window.addEventListener('tick:updated', function(e){
		Bot.addTick({
			tick: e.detail.tick,
			time: e.detail.time,
			label: '',
		});
		if ( Bot.server.contracts.length === 2 ) {
			Bot.on_strategy(e.detail.tick, e.detail.direction);
		} else if ( Bot.server.purchaseInfo === null ) {
			log('Skipped strategy because at least one of the contracts is not ready yet', 'info');
		}
	});

	Bot.server.accounts = [['Please add a token first', '']];
	Bot.server.purchase_choices = [['Click to select', '']];

	var findToken = function findToken(token){
		var index = -1;
		Bot.server.accounts.forEach(function(tokenInfo, i){
			if ( tokenInfo[1] === token ) {
				index = i;
			}	
		});	
		return index;
	};

	var removeToken = function removeToken(token){
		var index = findToken(token);
		Bot.utils.getStorageManager().removeToken(token);
		Bot.utils.updateTokenList();
	};
	Bot.server.logout = function logout(){
		Bot.utils.getStorageManager().removeAllTokens();
		Bot.utils.updateTokenList();
		log('Logged you out!', 'success');
	};

	Bot.server.addAccount = function addAccount(token){
		var index = findToken(token);
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
				log('Your token was added successfully', 'success');
			}, function(reason){
				api.disconnect();
				removeToken(token);
				showError('Authentication using token: ' + token + ' failed!');
			});
		}
	};

	Bot.server.getAccounts = function getAccounts(){
		return Bot.server.accounts;
	};

	Bot.server.getPurchaseChoices = function getPurchaseChoices(){
		return Bot.server.purchase_choices;
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
					log('Waiting for the purchased contract to finish, see the output panel for more info', 'info');
					Bot.server.contractService.addContract({
						statement: contract.transaction_id,
						startTime: contract.date_start + 1,
						duration: parseInt(proposalContract.echo_req.duration),
						type: contract.contract_type,
						barrier: proposalContract.echo_req.barrier,
						askPrice: parseFloat(proposalContract.proposal.ask_price),
						payout: proposalContract.proposal.payout,
					});
				}
			});
		}, function(reason){
			Bot.server.state = 'PORTFOLIO_NOT_RECEIVED';
			showError(reason);
		});
	};

	Bot.server.purchase = function purchase(option){
		var proposalContract = (option === Bot.server.contracts[1].echo_req.contract_type)? Bot.server.contracts[1] : Bot.server.contracts[0];
		Bot.server.contracts = [];
		log(proposalContract.proposal.longcode, 'info');
		Bot.server.api.buyContract(proposalContract.proposal.id, proposalContract.proposal.ask_price).then(function(purchaseContract){
			Bot.server.state = 'PURCHASED';
			Bot.server.purchaseInfo = {
				proposalContract: proposalContract,
				purchaseContract: purchaseContract,
			};
			log('Contract was purchased successfully, reading data from portfolio...', 'success');
			Bot.server.portfolio();
		}, function(reason){
			Bot.server.state = 'PURCHASE_FAILED';
			showError(reason);
		});
	};

	Bot.server.requestHistory = function requestHistory(){
		Bot.server.api.getTickHistory(Bot.server.symbol,{
			"end": "latest",
			"count": Bot.server.contractService.getCapacity(),
			"subscribe": 1,
		}).then(function(value){
			log('Request sent for history');
			Bot.server.tickWasRecieved = false;
		}, function(reason){
			showError(reason);
		});
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

	Bot.server.updateBalance = function updateBalance(data){
		Bot.server.balance = data.balance;
		Bot.server.balance_currency = data.currency;
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
			showError('Could not subscribe to transaction');
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
			if ( !Bot.server.tickWasRecieved ) {
				Bot.globals.numOfRuns++;
				Bot.updateGlobals();
			}
			Bot.server.tickWasRecieved = true;
			Bot.server.contractService.addTick(feed.tick);
		});

		Bot.server.api.events.on('history', function (feed) {
			Bot.server.contractService.addHistory(feed.history);
		});

	};

	Bot.server.submitProposal = function submitProposal(options){
		Bot.server.api.getPriceProposalForContract(options).then(function(value){
			Bot.server.state = 'PROPOSAL_SUBMITTED';
			Bot.globals.stake = +(+value.proposal.ask_price).toFixed(2);
			Bot.globals.payout = +(+value.proposal.payout).toFixed(2);
			Bot.updateGlobals();
			log('contract added: ' + value.proposal.longcode);
			if ( Bot.server.contracts.length === 1 ) {
				log('Contracts are ready to be purchased by the strategy', 'success'); 
			}
			Bot.server.contracts.push(value);
		}, function(reason){
			Bot.server.state = 'PROPOSAL_NOT_SUBMITTED';
			showError(reason);
		});
	};

	Bot.server.getContractInfo = function getContractInfo(result, contract_id){
		Bot.server.api.send({
			proposal_open_contract: 1,
			contract_id: contract_id
		}).then(function(response){
			var data = response.proposal_open_contract;
			Bot.utils.broadcast('contract:finished', {
				result: result,
				askPrice: data.buy_price,
				statement: data.transaction_ids['buy'],
				type: data.contract_type,
				entrySpot: data.entry_tick,
				entrySpotTime: data.entry_tick_time,
				exitSpot: data.exit_tick,
				exitSpotTime: data.exit_tick_time,
				barrier: data.barrier,
			});
		}, function(reason){
			showError(reason);
		});	
	};

	Bot.server.getLastPurchaseInfo = function getLastPurchaseInfo(){
		if ( Bot.server.purchaseInfo === null ){
			return;
		} 
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
				Bot.server.getContractInfo(result, transaction.contract_id);
			}
		}, function(reason){
			showError(reason);
		});
	};

	Bot.server.stop = function stop(){
		if ( Bot.server.api ) {
			try {
				Bot.server.api.disconnect();
				Bot.server.state = 'STOPPED';
			} catch(e){
			}
		}
	};

	Bot.server.restartContracts = function restartContracts(){
		Bot.server.purchaseInfo = null;
		Bot.server.contracts = [];
		Bot.server.authorizeCallback();
	};

	Bot.server.contractService = ContractService();	

	Bot.server.connect = function connect(){
		Bot.server.api.events.on('authorize', function (response) {
			if ( response.error ) {
				showError(response.error);
				Bot.server.state = 'NOT_AUTHORIZED';
			} else {
				if ( Bot.server.state !== 'AUTHORIZED' ) { // potentially bug maker
					log('Authenticated using token: ' + Bot.server.token , 'success');
					if ( Bot.server.state === 'INITIALIZED' ) { 
						Bot.server.observeTicks();
						Bot.server.observeTransaction();
					}
					if ( Bot.server.state === 'PORTFOLIO_RECEIVED' || Bot.server.state === 'PURCHASED' ) {
						Bot.server.getLastPurchaseInfo();
					} else {
						Bot.server.restartContracts();
					}
					Bot.server.requestHistory();
					Bot.server.requestTransaction();
					Bot.server.requestBalance();
					Bot.server.state = 'AUTHORIZED';
				}
			}
		});
	};

	Bot.server.trade = function trade(token, callback, trade_again){
		if ( token === '' ) {
			showError('No token is available to authenticate');
		} else {
			Bot.server.authorizeCallback = callback;
			if ( trade_again ) {
				Bot.server.state = 'TRADE_AGAIN';
				Bot.server.restartContracts();
			} else {
				Bot.server.state = 'INITIALIZED';
				Bot.server.token = token;
				Bot.server.api = new LiveApi();
				Bot.server.api.authorize(Bot.server.token);
				Bot.server.connect();
			}
		}
	};
})();
