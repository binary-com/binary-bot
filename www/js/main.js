(function() {
	var showError = function showError(message){
		console.log('Error: ' + message);
	};
	var LiveApi = window['binary-live-api'].LiveApi;
	var api = new LiveApi();
	Bot.server = {}; 
	Bot.server.api = api;
	Bot.login = function login(token, callback){
		api.authorize(token).then(function(value){
			callback(value);
		}, function (reason){
			showError(reason.message);
		});
	};
	
 	Bot.server.contractService = ContractService();	

	window.addEventListener('contract:finished', function(e){
		Bot.finish(e.detail);
	});

	window.addEventListener('tick:updated', function(e){
		if ( Bot.hasOwnProperty('strategy') ) {
			Bot.strategy(e.detail);
		}
	});

	Bot.server.portfolio = function portfolio(proposalContract, purchaseContract){
		api.getPortfolio().then(function(portfolio){
			var contractId = purchaseContract.buy.contract_id;
			portfolio.portfolio.contracts.forEach(function (contract) {
				if (contract.contract_id == contractId) {
					Bot.server.contractService.addContract({
						startTime: contract.date_start + 1,
						duration: parseInt(proposalContract.echo_req.duration),
						type: contract.contract_type,
						barrier: proposalContract.echo_req.barrier
					});
				}
			});
		}, function(reason){
			showError(reason.message);
		});
	};

	Bot.server.purchase = function purchase(index){
		if ( Bot.hasOwnProperty('strategy') ) {
			delete Bot.strategy;
		}
		index -= 1;
		if ( Bot.contracts.length !== 0 && index >= 0 && index < Bot.contracts.length ) {
			var proposalContract = Bot.contracts[index];
			api.buyContract(proposalContract.proposal.id, proposalContract.proposal.ask_price).then(function(purchaseContract){
				Bot.server.portfolio(proposalContract, purchaseContract);
			}, function(reason){
				showError(reason.message);
			});
		}
	};

	Bot.server.requestHistory = function requestHistory(){
		api.getTickHistory(Bot.server.symbol,{
			"end": "latest",
			"count": Bot.server.contractService.getCapacity(),
			"subscribe": 1
		}).then(function(value){
		}, function(reason){
			showError(reason.message);
		});
	};

	Bot.server.observeTicks = function observeTicks(){

		Bot.server.tickID = null;

		api.events.on('tick', function (feed) {
			if (feed && feed.echo_req.ticks_history === Bot.server.symbol) {
				Bot.server.contractService.addTick(feed.tick);
				Bot.server.tickID = feed.tick.id;
			}
		});

		api.events.on('history', function (feed) {
			if (feed && feed.echo_req.ticks_history === Bot.server.symbol) {
				Bot.server.contractService.addHistory(feed.history);
			}
		});

		Bot.server.requestHistory();
	};

	Bot.server.forgetProposals = function forgetProposals(callback){
		api.unsubscribeFromAllProposals().then(function(value){
			callback();
		}, function(reason){
			showError(reason.message);
		});
	};

	Bot.server.submitProposal = function submitProposal(options){
		api.subscribeToPriceForContractProposal(options).then(function(value){
			Bot.contracts.push(value);
		}, function(reason){
			showError(reason.message);
		});
	};
})();
