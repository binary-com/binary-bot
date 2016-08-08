'use strict';

import config from 'const';

module.exports = function init(){
	Object.keys(config.opposites).forEach(function(opposites){
		Blockly.JavaScript[opposites.toLowerCase()] = function(block) {
			if ( this.parentBlock_ === null ) {
				return '';
			}
			var duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
			var payouttype = block.getFieldValue('PAYOUTTYPE_LIST');
			var currency = block.getFieldValue('CURRENCY_LIST');
			var amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC);
			var prediction;
			if ( config.oppositesHaveBarrier.indexOf(opposites) > -1 ) {
				prediction = Blockly.JavaScript.valueToCode(block, 'PREDICTION', Blockly.JavaScript.ORDER_ATOMIC);
				if ( prediction === '' ) {
					throw {message: 'All trade types are required'};
				}
			}
			if (opposites === '' || duration === '' || payouttype === '' || currency === '' || amount === ''){
				throw {message: 'All trade types are required'};
			}
			var code = '{\n'+
				'condition: \'' + opposites + '\',\n'+
				'duration: ' + duration + ',\n'+
				'basis: \'' + payouttype + '\',\n'+
				'currency: \'' + currency + '\',\n'+
				'amount: (' + amount + ').toFixed(2),\n'+
				((config.oppositesHaveBarrier.indexOf(opposites) > -1 && prediction !== '' )? 'barrier: ' + prediction + ',\n' : '' ); // symbol to be added by the market block
			return code;
		};
	});
};
