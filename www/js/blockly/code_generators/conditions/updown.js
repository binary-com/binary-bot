Blockly.JavaScript['updown'] = function(block) {
	var duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
	var payouttype = Blockly.JavaScript.valueToCode(block, 'PAYOUTTYPE', Blockly.JavaScript.ORDER_ATOMIC);
	var currency = Blockly.JavaScript.valueToCode(block, 'CURRENCY', Blockly.JavaScript.ORDER_ATOMIC);
	var amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'Bot.conditions.updown({\n'+
		'duration: ' + duration + ',\n'+
		'payouttype: ' + payouttype + ',\n'+
		'currency: ' + currency + ',\n'+
		'amount: ' + amount + ',\n'+
	'})';
	return code;
};
