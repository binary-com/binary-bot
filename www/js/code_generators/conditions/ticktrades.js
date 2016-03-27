Object.keys(Bot.config.opposites).forEach(function(opposites){
	Blockly.JavaScript[opposites.toLowerCase()] = function(block) {
		var duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
		var payouttype = Blockly.JavaScript.valueToCode(block, 'PAYOUTTYPE', Blockly.JavaScript.ORDER_ATOMIC);
		var currency = Blockly.JavaScript.valueToCode(block, 'CURRENCY', Blockly.JavaScript.ORDER_ATOMIC);
		var amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC);
		var prediction;
		if ( Bot.config.opposites_have_barrier.indexOf(opposites) > -1 ) {
			prediction = Blockly.JavaScript.valueToCode(block, 'PREDICTION', Blockly.JavaScript.ORDER_ATOMIC);
		}
		if (opposites === '' || duration === '' || payouttype === '' || currency === '' || amount === ''){
			return '';
		}
		var code = 'Bot.conditions.ticktrade({\n'+
			'condition: \'' + opposites + '\',\n'+
			'duration: ' + duration + ',\n'+
			'payouttype: ' + payouttype + ',\n'+
			'currency: ' + currency + ',\n'+
			'amount: ' + amount + ',\n'+
			((Bot.config.opposites_have_barrier.indexOf(opposites) > -1 && prediction !== '' )? 'barrier: ' + prediction + ',\n' : '' )+
		'})';
		return code;
	};
});
