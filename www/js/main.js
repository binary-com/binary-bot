(function() {
	var LiveApi = window['binary-live-api'].LiveApi;
	var api = new LiveApi();
	binary_visual.login = function login(token, callback){
		api.authorize(token).then(function(value){
			callback(value);
		}, function (reason){
			console.log('Error: ' + reason.message);
		});
	};

	binary_visual.startTrade = function startTrade(options, callback){
		/*api.events.on('tick', callback);
		api.subscribeToTicks(options.symbol).then(function(value){
			console.log('Subscribed to tick for symbol:', value);
		}, function(reason){
			console.log('Error: ' + reason.message);
		});*/
	};

	binary_visual.getPriceForProposal = function getPriceForProposal(options){
		api.subscribeToPriceForContractProposal(options).then(function(value){
			console.log('Proposal Accepted ID:', value.proposal.id);
		}, function(reason){
			console.log('Error: ' + reason.message);
		});
	};
})();
