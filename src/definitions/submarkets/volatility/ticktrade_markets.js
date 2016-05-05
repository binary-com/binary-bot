// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#abpy8a
var blockly = require('blockly');
var i18n = require('i18n');
var config = require('../../../globals/config');
var relationChecker = require('../../../utils/relationChecker');

config.ticktrade_markets.forEach(function(market, index){
	blockly.Blocks[market] = {
		init: function() {
			this.appendDummyInput()
				.appendField(config.ticktrade_market_names[index]);
			this.appendStatementInput("CONDITION")
				.setCheck("Condition");
			this.setInputsInline(true);
			this.setPreviousStatement(true, "Submarket");
			this.setColour(345);
			this.setTooltip(i18n._('Chooses the market:') + ' ' + config.ticktrade_market_names[index]);
			this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
		},
		onchange: function(ev){
			relationChecker.submarket(this, ev);
		}
	};
});
