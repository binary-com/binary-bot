(function() {
	var showError = function showError(message){
		console.log('Error: ' + message);
	};
	var LiveApi = window['binary-live-api'].LiveApi;
	var api = new LiveApi();
	Bot.server = {}; 
	Bot.login = function login(token, callback){
		api.authorize(token).then(function(value){
			callback(value);
		}, function (reason){
			console.log('Error: ' + reason.message);
		});
	};
	
	Bot.server.startTrade = function startTrade(options, callback){
		/*api.events.on('tick', callback);
		api.subscribeToTicks(options.symbol).then(function(value){
			console.log('Subscribed to tick for symbol:', value);
		}, function(reason){
			console.log('Error: ' + reason.message);
		});*/
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
			Bot.contracts.push(value.proposal);
			console.log('Proposal Accepted!\nID:', value.proposal.id, Bot.contracts);
		}, function(reason){
			showError(reason.message);
		});
	};
})();
