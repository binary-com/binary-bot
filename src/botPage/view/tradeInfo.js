'use strict';

var clone = function clone(obj) {
	var returnValue = {};
	for ( var key in obj ) {
		returnValue[key] = obj[key];
	}
	return returnValue;
};

var tradeInfoSkel = {
	totalRuns: 0,
	totalProfit: '',
	totalPayout: '',
	totalStake: '',
	balance: '',
	tradeCount: 0,
	maxTradeCount: 50,
};

var TradeInfo = function TradeInfo() {
	this.tradeInfo = clone(tradeInfoSkel);
};

TradeInfo.prototype = Object.create(null, {
	reset: {
		value: function reset() {
			this.tradeInfo = clone(tradeInfoSkel);
			this.update();
		}
	},
	update: {
		value: function update() {
			for (var key in this.tradeInfo){
				$('.' + key)
					.text(this.tradeInfo[key]);
				if (key === 'totalProfit') {
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
			var trade = clone(_trade);
			trade.number = this.tradeInfo.totalRuns;
			if (this.tradeInfo.tradeCount === this.tradeInfo.maxTradeCount) {
				$('#tradesDisplay tbody tr:first').insertAfter($('#tradesDisplay tbody tr:last'));
			} else {
				this.tradeInfo.tradeCount += 1;
				$('#tradesDisplay tbody')
					.append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
				$('.table-scroll')
					.scrollTop($('.table-scroll')[0].scrollHeight);
			}
			var profit = +(Number(trade.sell_price) - Number(trade.buy_price)).toFixed(2);
			var profitColor = (profit<0) ? 'red' : 'green';
			var elements = '<td>' + trade.number + '</td>' + '<td>' + trade.transaction_ids.buy + '</td>' + '<td>' + trade.contract_type + '</td>' + '<td>' + trade.entry_tick + '</td>' + '<td>' + trade.exit_tick + '</td>' + '<td>' + trade.buy_price + '</td>' + '<td>' + trade.sell_price + '</td>' + '<td style="color: ' + profitColor + '">' + profit + '</td>';
			$('#tradesDisplay tbody tr:last td:nth-child(1)')
				.text(trade.number);
			$('#tradesDisplay tbody tr:last td:nth-child(2)')
				.text(trade.transaction_ids.buy);
			$('#tradesDisplay tbody tr:last td:nth-child(3)')
				.text(trade.contract_type);
			$('#tradesDisplay tbody tr:last td:nth-child(4)')
				.text(trade.entry_tick);
			$('#tradesDisplay tbody tr:last td:nth-child(5)')
				.text(trade.exit_tick);
			$('#tradesDisplay tbody tr:last td:nth-child(6)')
				.text(trade.buy_price);
			$('#tradesDisplay tbody tr:last td:nth-child(7)')
				.text(trade.sell_price);
			$('#tradesDisplay tbody tr:last td:nth-child(8)')
				.text(profit);
			$('#tradesDisplay tbody tr:last td:nth-child(8)').css('color', profitColor);
		}
	}
});

module.exports = TradeInfo;
