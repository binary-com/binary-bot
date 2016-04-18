Bot.markets = {};
Bot.markets.random = {};
Bot.config.ticktrade_markets.forEach(function(market){
	Bot.markets.random[market] = function(options){
		Bot.server.symbol = market.toUpperCase();

		options.forEach(function(option){
			option.symbol = Bot.server.symbol;
		});

		var submarket = function submarket(cb){
			Bot.server.submitProposal(options[0], function(){
				Bot.server.submitProposal(options[1], cb);
			}, true);
		};

		return submarket;
	};
});
