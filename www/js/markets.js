Bot.markets = {};
Bot.markets.random = {};
Bot.markets.random.r_100 = function(options){

	options.forEach(function(option){
		option.symbol = 'R_100';
	});

	var submarket = function submarket(){
		Bot.contracts = [];
		Bot.server.forgetProposals(function(){
			options.forEach(function(option){
				Bot.server.submitProposal(option);
			});
		});	
	};

	return submarket;
};
