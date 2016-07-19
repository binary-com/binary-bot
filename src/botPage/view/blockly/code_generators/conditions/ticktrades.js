var blockly = require('blockly');
var config = require('const');
Object.keys(config.opposites).forEach(function(opposites){
	blockly.JavaScript[opposites.toLowerCase()] = function(block) {
		if ( this.parentBlock_ === null ) {
			return '';
		}
		var duration = blockly.JavaScript.valueToCode(block, 'DURATION', blockly.JavaScript.ORDER_ATOMIC);
		var payouttype = block.getFieldValue('PAYOUTTYPE_LIST');
		var currency = block.getFieldValue('CURRENCY_LIST');
		var amount = blockly.JavaScript.valueToCode(block, 'AMOUNT', blockly.JavaScript.ORDER_ATOMIC);
		var prediction;
		if ( config.oppositesHaveBarrier.indexOf(opposites) > -1 ) {
			prediction = blockly.JavaScript.valueToCode(block, 'PREDICTION', blockly.JavaScript.ORDER_ATOMIC);
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
			((config.oppositesHaveBarrier.indexOf(opposites) > -1 && prediction !== '' )? 'barrier: ' + prediction + ',\n' : '' )+
		'})';
		return code;
	};
});
