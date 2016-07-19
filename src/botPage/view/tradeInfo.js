var Translator = require('translator');
var translator = new Translator();
var $ = require('jquery');

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

var reset = function reset() {
	copyObjectKeys(tradeInfo, initialTradeInfo);
	update();
	show();
};

var update = function update() {
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

var add = function add(trade) {
	trade.number = tradeInfo.numOfRuns;
	// tradeInfo.tradeTable.reverse(); //reverse the table row growth
	if (tradeInfo.tradeTable.length > tradeInfo.tradesCount) {
		tradeInfo.tradeTable.shift();
	}
	tradeInfo.tradeTable.push(trade);
	// tradeInfo.tradeTable.reverse();
	show();
};

var show = function show() {
	$('#tradesDisplay tbody')
		.children()
		.remove();
	tradeInfo.tradeTable.forEach(function (trade, index) {
		var lastProfit = +(+trade.sell_price - (+trade.buy_price))
			.toFixed(2);
		var element = '<tr>' + '<td>' + trade.number + '</td>' + '<td>' + trade.transaction_ids.buy + '</td>' + '<td>' + trade.contract_type + '</td>' + '<td>' + trade.entry_tick + '</td>' + '<td>' + trade.exit_tick + '</td>' + '<td>' + trade.buy_price + '</td>' + '<td>' + trade.sell_price + '</td>' + '<td>' + lastProfit + '</td>' + '</tr>';
		$('#tradesDisplay tbody')
			.append(element);
	});
	$('.table-scroll')
		.scrollTop($('.table-scroll')[0].scrollHeight);
};

module.exports = {
	tradeInfo: tradeInfo,
	reset: reset,
	update: update,
	add: add,
	show: show,
};
