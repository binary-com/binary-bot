Blockly.JavaScript['currency'] = function(block) {
	var currency_list = block.getFieldValue('CURRENCY_LIST');
	var code = currency_list;
	code = '\'' + code + '\'';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
