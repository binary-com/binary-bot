(function(){
	var showError = Bot.utils.showError;
	var log = Bot.utils.log;
	var LiveApi = window['binary-live-api'].LiveApi;
	Bot.server = {}; 

	window.addEventListener('contract:finished', function(e){
		Bot.addResult(e.detail.result);
		var payout = (e.detail.result !== 'win' )? 0 : +e.detail.payout;
		Bot.globals.lastProfit = +(payout - +e.detail.askPrice).toFixed(2);
		Bot.globals.totalProfit = +(+Bot.globals.totalProfit + +Bot.globals.lastProfit).toFixed(2);
		Bot.globals.lastResult = e.detail.result;
		Bot.updateGlobals();
		var detail_list = [
			e.detail.statement, 
			+e.detail.askPrice, 
			+payout, 
			Bot.globals.lastProfit,
			e.detail.type, 
			+e.detail.entrySpot, 
			new Date(parseInt(e.detail.entrySpotTime + '000')).toLocaleTimeString(),
			+e.detail.exitSpot, 
			new Date(parseInt(e.detail.exitSpotTime + '000')).toLocaleTimeString(),
			+e.detail.barrier,
		];
		log('Purchase was finished, result is: ' + e.detail.result, (e.detail.result === 'win')? 'success': 'error');
		Bot.on_finish(e.detail.result, detail_list);
	});

	window.addEventListener('contract:updated', function(e){
		Bot.addResult(e.detail.result);
	});

	window.addEventListener('tick:updated', function(e){
		Bot.addTick({
			tick: e.detail.tick,
			label: '<span> ' + e.detail.direction + '</span>',
		});
		if ( Bot.server.contracts.length === 2 ) {
			Bot.on_strategy(e.detail.tick, e.detail.direction);
		} else if ( !Bot.server.purchaseBegan ) {
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

	Bot.server.portfolio = function portfolio(proposalContract, purchaseContract){
		Bot.server.api.getPortfolio().then(function(portfolio){
			Bot.server.updateDetected();
			var contractId = purchaseContract.buy.contract_id;
			portfolio.portfolio.contracts.forEach(function (contract) {
				if (contract.contract_id == contractId) {
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
			Bot.server.updateDetected();
			showError(reason);
		});
	};

	Bot.server.purchase = function purchase(option){
		var proposalContract = (option === Bot.server.contracts[1].echo_req.contract_type)? Bot.server.contracts[1] : Bot.server.contracts[0];
		Bot.server.contracts = [];
		log(proposalContract.proposal.longcode, 'info');
		Bot.server.api.buyContract(proposalContract.proposal.id, proposalContract.proposal.ask_price).then(function(purchaseContract){
			Bot.server.updateDetected();
			Bot.server.purchaseBegan = true;
			log('Contract was purchased successfully, reading data from portfolio...', 'success');
			Bot.server.portfolio(proposalContract, purchaseContract);
		}, function(reason){
			Bot.server.updateDetected();
			showError(reason);
		});
	};

	Bot.server.updateDetected = function updateDetected(){
		Bot.server.lastUpdatetime = parseInt(new Date().getTime()/1000);
	};

	Bot.server.checkUpdate = function checkUpdate(){
		Bot.server.checkUpdateInterval = setInterval(function(){
			var now = parseInt(new Date().getTime()/1000);
			if ( now - Bot.server.lastUpdatetime > 5 ) {
				showError('No update was received in 5 seconds, trying again...');
				log('restarting the trade...', 'info');
				Bot.server.connect();
			}
		}, 5000);
	};

	Bot.server.requestHistory = function requestHistory(){
		Bot.server.api.getTickHistory(Bot.server.symbol,{
			"end": "latest",
			"count": Bot.server.contractService.getCapacity(),
			"subscribe": 1,
		}).then(function(value){
			Bot.server.updateDetected();
			log('Request sent for history');
			Bot.server.tickWasRecieved = false;
		}, function(reason){
			Bot.server.updateDetected();
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

	Bot.server.observeBalance = function observeBalance(){
		Bot.server.api.events.on('balance', function (response) {
			Bot.server.updateDetected();
			Bot.server.balance = response.balance.balance;
			Bot.server.balance_currency = response.balance.currency;
			Bot.globals.balance = Bot.server.balance_currency + ' ' + parseFloat(Bot.server.balance);
		});

		Bot.server.api.subscribeToBalance().then(function(response){
			Bot.server.updateDetected();
			Bot.server.balance = response.balance.balance;
			Bot.server.balance_currency = response.balance.currency;
			Bot.globals.balance = Bot.server.balance_currency + ' ' + parseFloat(Bot.server.balance);
		}, function(reason){
			showError('Could not subscribe to balance');
			Bot.server.updateDetected();
		});

	};

	Bot.server.observeTicks = function observeTicks(){

		Bot.server.api.events.on('tick', function (feed) {
			Bot.server.updateDetected();
			log('tick received at: ' + feed.tick.epoch);
			if ( !Bot.server.tickWasRecieved ) {
				Bot.globals.numOfRuns++;
				Bot.updateGlobals();
			}
			Bot.server.tickWasRecieved = true;
			Bot.server.contractService.addTick(feed.tick);
		});

		Bot.server.api.events.on('history', function (feed) {
			Bot.server.updateDetected();
			Bot.server.contractService.addHistory(feed.history);
		});

		Bot.server.requestHistory();
	};

	Bot.server.submitProposal = function submitProposal(options){
		Bot.server.api.getPriceProposalForContract(options).then(function(value){
			Bot.server.updateDetected();
			Bot.globals.stake = +(+value.proposal.ask_price).toFixed(2);
			Bot.globals.payout = +(+value.proposal.payout).toFixed(2);
			Bot.updateGlobals();
			log('contract added: ' + value.proposal.longcode);
			if ( Bot.server.contracts.length === 1 ) {
				log('Contracts are ready to be purchased by the strategy', 'success'); 
			}
			Bot.server.contracts.push(value);
		}, function(reason){
			Bot.server.updateDetected();
			showError(reason);
		});
	};


	Bot.server.stop = function stop(){
		if ( Bot.server.api ) {
			try {
				Bot.server.api.disconnect();
			} catch(e){
			}
		}
	};

	Bot.server.connect = function connect(){
		Bot.server.stop();
		Bot.server.api = new LiveApi();
		Bot.server.api.authorize(Bot.server.token);
		clearInterval(Bot.server.checkUpdateInterval);
		Bot.server.checkUpdate();
		Bot.server.api.events.on('authorize', function (response) {
			if ( response.error ) {
				showError(response.error);
			} else {
				Bot.server.updateDetected();
				log('Authenticated using token: ' + Bot.server.token , 'success');
				Bot.server.contractService = ContractService();	
				Bot.server.contracts = [];
				Bot.server.purchaseBegan = false;
				Bot.server.observeTicks();
				Bot.server.observeBalance();
				Bot.server.authorizeCallback();
			}
		});
	};

	Bot.server.init = function init(token, callback){
		if ( token === '' ) {
			showError('No token is available to authenticate');
		} else {
			Bot.server.token = token;
			Bot.server.authorizeCallback = callback;
			Bot.server.connect();
		}
	};
})();
