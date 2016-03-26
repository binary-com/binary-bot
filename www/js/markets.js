Bot.markets = {};
Bot.markets.random = {};
Bot.config.updown_markets.forEach(function(market){
	Bot.markets.random[market] = function(options){
		Bot.server.symbol = market.toUpperCase();

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
});
