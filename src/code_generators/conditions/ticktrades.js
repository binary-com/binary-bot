Object.keys(Bot.config.opposites).forEach(function(opposites){
	Blockly.JavaScript[opposites.toLowerCase()] = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
		var payouttype = block.getFieldValue('PAYOUTTYPE_LIST');
		var currency = block.getFieldValue('CURRENCY_LIST');
		var amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC);
		var prediction;
		if ( Bot.config.opposites_have_barrier.indexOf(opposites) > -1 ) {
			prediction = Blockly.JavaScript.valueToCode(block, 'PREDICTION', Blockly.JavaScript.ORDER_ATOMIC);
			if ( prediction === '' ) {
				throw {message: 'All condition options are required'};
			}
		}
		if (opposites === '' || duration === '' || payouttype === '' || currency === '' || amount === ''){
			throw {message: 'All condition options are required'};
		}
		var code = 'Bot.conditions.ticktrade({\n'+
			'condition: \'' + opposites + '\',\n'+
			'duration: ' + duration + ',\n'+
			'payouttype: \'' + payouttype + '\',\n'+
			'currency: \'' + currency + '\',\n'+
			'amount: (' + amount + ').toFixed(2),\n'+
			((Bot.config.opposites_have_barrier.indexOf(opposites) > -1 && prediction !== '' )? 'barrier: ' + prediction + ',\n' : '' )+
		'})';
		return code;
	};
});
