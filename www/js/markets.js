Bot.markets = {};
Bot.markets.random = {};
Bot.markets.random.r_100 = function(options){

	Bot.server.symbol = 'R_100';
	options.forEach(function(option){
		option.symbol = Bot.server.symbol;
	});

	var submarket = function submarket(){
		Bot.contracts = [];
		Bot.server.forgetProposals(function(){
			options.forEach(function(option){
				Bot.server.submitProposal(option);
			});
		});	
	};

	Bot.server.observeTicks();
	var ups = 0;
	var downs = 0;
	var ticks = 0;
	Bot.strategy = function strategy(tick){
		if ( ticks >= 3  ) { 
			if ( ups > downs ) {
				console.log('parchased', 'UP');
				Bot.server.purchase(1);
			} else {
				console.log('parchased', 'DOWN');
				Bot.server.purchase(2);
			}
		} else {
			if ( tick.direction === 'UP' ) {
				ups += 1;
			} else if ( tick.direction === 'DOWN' ) {
				downs += 1;
			}
			ticks += 1;
		}
	};
	Bot.finish = function finish(result){
		console.log('result', result);
	};
	return submarket;
};

