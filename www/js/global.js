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
	results: {},
	ticksCount: 15,
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
		var style = 'style="text-align: left; font-variant: small-caps; font-weight: bold;';
		if ( index <= 1 ) {
			style += 'opacity: 1;"';
		} else {
			style += 'opacity: '+ calculateOpacity(index) +';"';
		}
		var element = '<li ' + style + ' class="tick"><span style="font-style: italic; font-size: x-small; font-weight: normal">' + new Date(parseInt(tick.time + '000')).toLocaleTimeString() + ':</span><span> ' + tick.tick + '</span>' + tick.label;
		if ( Bot.globals.results.hasOwnProperty(tick.time) ) {
			element += '<span> - ' + Bot.globals.results[tick.time] + '</span>';
		}
		element += '</li>';
		$('#ticksDisplay').append(element);
	});
	$('#ticksDisplay li:nth-child(2)').animate({opacity: calculateOpacity(1)}, 1000);
};

Bot.addResult = function addResult(time, result){
	Bot.globals.results[time] = result;
	Bot.showTicks();
};

Bot.addTick = function addTick(tick){
	Bot.globals.ticks.reverse();
	if ( Bot.globals.ticks.length === Bot.globals.ticksCount ) {
		delete Bot.globals.results[Bot.globals.ticks[0].time];
		Bot.globals.ticks.shift();
	}
	Bot.globals.ticks.push(tick);
	Bot.globals.ticks.reverse();
	Bot.showTicks();
};

Bot.undo = function undo(){
	Blockly.mainWorkspace.undo();
};

Bot.redo = function redo(){
	Blockly.mainWorkspace.undo(true);
};
