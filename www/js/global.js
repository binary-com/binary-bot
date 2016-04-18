Bot = {};
Bot.globals = {
	numOfRuns: 0,
	stake: '',
	payout: '',
	totalProfit: '',
	totalPayout: '',
	totalStake: '',
	lastProfit: '',
	lastResult: '',
	balance: '',
	ticks: [],
	tickResults: {},
	ticksCount: 15,
	tradeTable: [],
	tradesCount: 10000,
	tableSize: 10,
};

Bot.initialGlobals = {};

Bot.copyObjectKeys = function copyObjectKeys(obj1, obj2){
	$.extend(obj1, JSON.parse(JSON.stringify(obj2)));
};

Bot.copyObjectKeys(Bot.initialGlobals, Bot.globals);

Bot.resetGlobals = function resetGlobals(){
	Bot.copyObjectKeys(Bot.globals, Bot.initialGlobals);
	Bot.updateGlobals();
	Bot.showTicks();
	Bot.showTrades();
};

Bot.updateGlobals = function updateGlobals(){
	Object.keys(Bot.globals).forEach(function(key){
		$('.'+ key).text(Bot.globals[key]);	
		if ( key === 'totalProfit' || key === 'lastProfit' ){
			if ( +Bot.globals[key] > 0 ) {
				$('.' + key).css('color', 'green');
			} else if ( +Bot.globals[key] < 0 ) {
				$('.' + key).css('color', 'red');
			} else {
				$('.' + key).css('color', 'black');
			}
		}
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
		var element = '<li ' + style + ' class="tick"><span style="font-style: italic; font-size: x-small; font-weight: normal">';
	 	element += new Date(parseInt(tick.time + '000')).toLocaleTimeString() + ':</span><span> ' + tick.tick + '</span>';
		if ( Bot.globals.tickResults.hasOwnProperty(tick.time) ) {
			var result = Bot.globals.tickResults[tick.time];
			var resultStyle = ' style="';
			if ( result === 'win' ) {
				resultStyle += 'color: green;" ';
			} else {
				resultStyle += 'color: red;" ';
			}
			element += ':<span' + resultStyle + '> ' + Bot.globals.tickResults[tick.time] + '</span>';
		}
		element += '</li>';
		$('#ticksDisplay').append(element);
	});
	$('#ticksDisplay li:nth-child(2)').animate({opacity: calculateOpacity(1)}, 1000);
};

Bot.addResult = function addResult(time, result){
	Bot.globals.tickResults[time] = result;
	Bot.showTicks();
};

Bot.addTick = function addTick(tick){
	Bot.globals.ticks.reverse();
	if ( Bot.globals.ticks.length > Bot.globals.ticksCount ) {
		delete Bot.globals.tickResults[Bot.globals.ticks[0].time];
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

Bot.addTrade = function addTrade(trade){
	trade.number = Bot.globals.numOfRuns;
	Bot.globals.tradeTable.reverse();
	if ( Bot.globals.tradeTable.length > Bot.globals.tradesCount ) {
		Bot.globals.tradeTable.shift();
	}
	Bot.globals.tradeTable.push(trade);
	Bot.globals.tradeTable.reverse();
	Bot.showTrades();
};

Bot.showTrades = function showTrades(){
	$('#tradesDisplay tbody').children().remove();
	var count = 0;
	Bot.globals.tradeTable.forEach(function(trade, index) {
		var payout = (trade.result !== 'win' )? 0 : +trade.payout;
		var lastProfit = +(payout - +trade.askPrice).toFixed(2);
		var element = '<tr>'
			+'<td>' + trade.number + '</td>'
			+'<td>' + trade.statement + '</td>'
			+'<td>' + trade.type + '</td>'
			+'<td>' + trade.entrySpot + '</td>'
			+'<td>' + trade.exitSpot + '</td>'
			+'<td>' + trade.askPrice + '</td>'
			+'<td>' + payout + '</td>'
			+'<td>' + lastProfit + '</td>'
		+'</tr>';
		$('#tradesDisplay tbody').append(element);
		count += 1;
	});
	for ( var i = count; i < Bot.globals.tableSize ; i+=1 ){
		var element = '<tr>';
		for ( var j = 0 ; j < 8 ; j += 1 ) {
			element += '<td></td>';
		}
		+'</tr>';
		$('#tradesDisplay tbody').append(element);
	}
};
