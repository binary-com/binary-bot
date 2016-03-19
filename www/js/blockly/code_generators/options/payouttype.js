Blockly.JavaScript['payouttype'] = function(block) {
	var payouttype_list = block.getFieldValue('PAYOUTTYPE_LIST');
	var index = eval(Blockly.JavaScript.valueToCode(block, 'PAYOUTTYPE', Blockly.JavaScript.ORDER_ATOMIC));
	var selectedByIndex = Bot.utils.chooseByIndex('PAYOUTTYPE', index);
	var code = (selectedByIndex === null) ? payouttype_list : selectedByIndex;
	code = '\'' + code + '\'';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];

};
