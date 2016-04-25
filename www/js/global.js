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
	tradeTable: [],
	tradesCount: 10000,
	tableSize: 5,
};

Bot.initialGlobals = {};

Bot.copyObjectKeys = function copyObjectKeys(obj1, obj2){
	$.extend(obj1, JSON.parse(JSON.stringify(obj2)));
};

Bot.copyObjectKeys(Bot.initialGlobals, Bot.globals);

Bot.resetGlobals = function resetGlobals(){
	Bot.copyObjectKeys(Bot.globals, Bot.initialGlobals);
	Bot.updateGlobals();
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

Bot.undo = function undo(){
	Blockly.mainWorkspace.undo();
};

Bot.redo = function redo(){
	Blockly.mainWorkspace.undo(true);
};

Bot.addTrade = function addTrade(trade){
	trade.number = Bot.globals.numOfRuns;
	// Bot.globals.tradeTable.reverse(); //reverse the table row growth
	if ( Bot.globals.tradeTable.length > Bot.globals.tradesCount ) {
		Bot.globals.tradeTable.shift();
	}
	Bot.globals.tradeTable.push(trade);
	// Bot.globals.tradeTable.reverse();
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
