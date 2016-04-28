Bot.config.ticktrade_markets.forEach(function(market){
	Blockly.JavaScript[market] = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var condition = Blockly.JavaScript.statementToCode(block, 'CONDITION');
		if ( !condition ) {
			throw {message: 'A condition has to be defined for the market'};
		}
		var code = 'Bot.markets.volatility.' + market + '('+condition.trim()+')';
		return code;
	};
});
