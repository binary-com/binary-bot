var $ = require('jquery');
var _ = require('underscore');

var tradeInfoSkel = {
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

var TradeInfo = function TradeInfo() {
	this.tradeInfo = _.clone(tradeInfoSkel);
};

TradeInfo.prototype = Object.create(null, {
	reset: {
		value: function reset() {
			this.tradeInfo = _.clone(tradeInfoSkel);
			this.update();
			this.show();
		}
	},
	update: {
		value: function update() {
			for (var key in this.tradeInfo){
				$('.' + key)
					.text(this.tradeInfo[key]);
				if (key === 'totalProfit' || key === 'lastProfit') {
					if (+this.tradeInfo[key] > 0) {
						$('.' + key)
							.css('color', 'green');
					} else if (+this.tradeInfo[key] < 0) {
						$('.' + key)
							.css('color', 'red');
					} else {
						$('.' + key)
							.css('color', 'black');
					}
				}
			}
		}
	},
	add: {
		value: function add(_trade) {
			var trade = _.clone(_trade);
			trade.number = this.tradeInfo.numOfRuns;
			if (this.tradeInfo.tradeTable.length > this.tradeInfo.tradesCount) {
				this.tradeInfo.tradeTable.shift();
			}
			this.tradeInfo.tradeTable.push(trade);
			this.update();
			this.show();
		}
	},
	show: {
		value: function show() {
			$('#tradesDisplay tbody')
				.children()
				.remove();
			this.tradeInfo.tradeTable.forEach(function (trade, index) {
				var lastProfit = +(+trade.sell_price - (+trade.buy_price))
					.toFixed(2);
				var element = '<tr>' + '<td>' + trade.number + '</td>' + '<td>' + trade.transaction_ids.buy + '</td>' + '<td>' + trade.contract_type + '</td>' + '<td>' + trade.entry_tick + '</td>' + '<td>' + trade.exit_tick + '</td>' + '<td>' + trade.buy_price + '</td>' + '<td>' + trade.sell_price + '</td>' + '<td>' + lastProfit + '</td>' + '</tr>';
				$('#tradesDisplay tbody')
					.append(element);
			});
			$('.table-scroll')
				.scrollTop($('.table-scroll')[0].scrollHeight);
		}
	}
});

module.exports = TradeInfo;
