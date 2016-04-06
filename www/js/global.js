Bot = {};
Bot.globals = {
	numOfRuns: 0,
	stake: '',
	payout: '',
	totalProfit: '',
	lastProfit: '',
	lastResult: '',
	balance: '',
	ticks: [],
	ticksCount: 4,
};
Bot.updateGlobals = function updateGlobals(){
	Object.keys(Bot.globals).forEach(function(key){
		$('#'+ key +'').text(Bot.globals[key]);	
	});
};

Bot.showTicks = function showTicks(){
	$('#ticksDisplay').children().remove();
	var calculateOpacity = function calculateOpacity(index){
		return (0.1 + (Bot.globals.ticks.length - index)/Bot.globals.ticks.length).toFixed(1);
	};

	Bot.globals.ticks.forEach(function(tick, index) {
		tick = Bot.globals.ticks[index];
		var style = '';
		if ( index <= 1 ) {
			style = 'style="opacity: 1;"';
		} else {
			style = 'style="opacity: '+ calculateOpacity(index) +';"';
		}
		$('#ticksDisplay').append('<div ' + style + ' class="tick"><span>' + tick.tick + '</span>' + tick.label + '</div>');
	});
	$('#ticksDisplay div:nth-child(2)').animate({opacity: calculateOpacity(1)}, 1000);
	Bot.globals.ticks.forEach(function(tick, index) {
		if ( tick.result ) {
			Bot.addResult(tick.result, index);	
		}
	});
};

Bot.addResult = function addResult(result, index){
	if ( isNaN(index) ) {
		index = 0;
		Bot.globals.ticks[0].result = result;
	}
	$('#ticksDisplay div:nth-child(' + (index + 1).toString() + ')').append('<span> - ' + result + '</span>');
};

Bot.addTick = function addTick(tick){
	Bot.globals.ticks.reverse();
	if ( Bot.globals.ticks.length === Bot.globals.ticksCount ) {
		Bot.globals.ticks.shift();
	}
	Bot.globals.ticks.push(tick);
	Bot.globals.ticks.reverse();
	Bot.showTicks();
};
