var blockly = require('blockly');
var i18n = require('i18n');
var debug = false;
var logQueue = [];

var on_finish = function () {};
var on_strategy = function () {};

var tour = null;

var accounts = [
	[i18n._('Please add a token first'), '']
];
var purchase_choices = [
	[i18n._('Click to select'), '']
];


var tradeInfo = {
	numOfRuns: 0,
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

var initialTradeInfo = {};

var copyObjectKeys = function copyObjectKeys(obj1, obj2) {
	$.extend(obj1, JSON.parse(JSON.stringify(obj2)));
};

copyObjectKeys(initialTradeInfo, tradeInfo);

var resetTradeInfo = function resetTradeInfo() {
	copyObjectKeys(tradeInfo, initialTradeInfo);
	updateTradeInfo();
	showTradeInfo();
};

var updateTradeInfo = function updateTradeInfo() {
	Object.keys(tradeInfo)
		.forEach(function (key) {
			$('.' + key)
				.text(tradeInfo[key]);
			if (key === 'totalProfit' || key === 'lastProfit') {
				if (+tradeInfo[key] > 0) {
					$('.' + key)
						.css('color', 'green');
				} else if (+tradeInfo[key] < 0) {
					$('.' + key)
						.css('color', 'red');
				} else {
					$('.' + key)
						.css('color', 'black');
				}
			}
		});
};

var undoBlocks = function undoBlocks() {
	blockly.mainWorkspace.undo();
};

var redoBlocks = function redoBlocks() {
	blockly.mainWorkspace.undo(true);
};

var addTradeInfo = function addTradeInfo(trade) {
	trade.number = tradeInfo.numOfRuns;
	// tradeInfo.tradeTable.reverse(); //reverse the table row growth
	if (tradeInfo.tradeTable.length > tradeInfo.tradesCount) {
		tradeInfo.tradeTable.shift();
	}
	tradeInfo.tradeTable.push(trade);
	// tradeInfo.tradeTable.reverse();
	showTradeInfo();
};

var showTradeInfo = function showTradeInfo() {
	$('#tradesDisplay tbody')
		.children()
		.remove();
	var count = 0;
	tradeInfo.tradeTable.forEach(function (trade, index) {
		var lastProfit = +(+trade.sell_price - (+trade.buy_price))
			.toFixed(2);
		var element = '<tr>' + '<td>' + trade.number + '</td>' + '<td>' + trade.transaction_ids.buy + '</td>' + '<td>' + trade.contract_type + '</td>' + '<td>' + trade.entry_tick + '</td>' + '<td>' + trade.exit_tick + '</td>' + '<td>' + trade.buy_price + '</td>' + '<td>' + trade.sell_price + '</td>' + '<td>' + lastProfit + '</td>' + '</tr>';
		$('#tradesDisplay tbody')
			.append(element);
		count += 1;
	});
	for (var i = count; i < tradeInfo.tableSize; i += 1) {
		var element = '<tr>';
		for (var j = 0; j < 8; j += 1) {
			element += '<td></td>';
		}
		element += '</tr>';
		$('#tradesDisplay tbody')
			.append(element);
	}
	$('.table-scroll')
		.scrollTop($('.table-scroll')[0].scrollHeight);
};

var toggleDebug = function toggleDebug() {
	debug = !debug;
	if (debug) {
		logQueue.forEach(function (log) {
			console.log.apply(console, log);
		});
		logQueue = [];
	}
};

var addLogToQueue = function addLogToQueue() {
	logQueue.push(Array.prototype.slice.apply(arguments));
};

var isDebug = function isDebug() {
	return debug;
};

var disableRun = function disableRun(disabled) {
	$('#runButton')
		.prop('disabled', disabled);
};

module.exports = {
	tradeInfo: tradeInfo,
	resetTradeInfo: resetTradeInfo,
	updateTradeInfo: updateTradeInfo,
	undoBlocks: undoBlocks,
	redoBlocks: redoBlocks,
	addTradeInfo: addTradeInfo,
	showTradeInfo: showTradeInfo,
	toggleDebug: toggleDebug,
	addLogToQueue: addLogToQueue,
	isDebug: isDebug,
	accounts: accounts,
	purchase_choices: purchase_choices,
	disableRun: disableRun,
	on_finish: on_finish,
	on_strategy: on_strategy,
	tour: tour,
};
