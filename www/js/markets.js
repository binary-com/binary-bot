Bot.markets = {};
Bot.markets.random = {};
Bot.markets.random.r_100 = function(options){


	Bot.server.symbol = 'R_100';

	options.forEach(function(option){
		option.symbol = Bot.server.symbol;
	});

	var submarket = function submarket(){
		options.forEach(function(option){
			Bot.server.submitProposal(option);
		});
	};

	return submarket;
};

