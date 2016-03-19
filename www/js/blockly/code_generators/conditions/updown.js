Blockly.JavaScript['updown'] = function(block) {
	var duration = eval(Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC));
	var durationunit = Blockly.JavaScript.valueToCode(block, 'DURATIONUNIT', Blockly.JavaScript.ORDER_ATOMIC);
	var payouttype = Blockly.JavaScript.valueToCode(block, 'PAYOUTTYPE', Blockly.JavaScript.ORDER_ATOMIC);
	var currency = Blockly.JavaScript.valueToCode(block, 'CURRENCY', Blockly.JavaScript.ORDER_ATOMIC);
	var amount = eval(Blockly.JavaScript.valueToCode(block, 'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC));
	var code = 'Bot.conditions.updown({\n'+
		'duration: ' + duration + ',\n'+
		'durationunit: ' + durationunit + ',\n'+
		'payouttype: ' + payouttype + ',\n'+
		'currency: ' + currency + ',\n'+
		'amount: ' + amount + ',\n'+
	'})';
	return code;
};
