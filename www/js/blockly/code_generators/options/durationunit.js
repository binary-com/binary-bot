Blockly.JavaScript['durationunit'] = function(block) {
	var durationunit_list = block.getFieldValue('DURATIONUNIT_LIST');
	var code = durationunit_list;
	code = '\'' + code + '\'';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
