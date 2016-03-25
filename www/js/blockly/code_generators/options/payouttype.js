Blockly.JavaScript['payouttype'] = function(block) {
	var payouttype_list = block.getFieldValue('PAYOUTTYPE_LIST');
	var code = payouttype_list;
	code = '\'' + code + '\'';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];

};
