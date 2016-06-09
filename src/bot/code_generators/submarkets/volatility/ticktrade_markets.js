var blockly = require('blockly');
var config = require('../../../globals/config');
config.ticktrade_markets.forEach(function(market){
	blockly.JavaScript[market] = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var condition = blockly.JavaScript.statementToCode(block, 'CONDITION');
		if ( !condition ) {
			throw {message: 'A condition has to be defined for the market'};
		}
		var code = 'Bot.markets.volatility.' + market + '('+condition.trim()+')';
		return code;
	};
});
