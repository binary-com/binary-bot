Blockly.JavaScript['durationunit'] = function(block) {
	var durationunit_list = block.getFieldValue('DURATIONUNIT_LIST');
	var index = eval(Blockly.JavaScript.valueToCode(block, 'DURATIONUNIT', Blockly.JavaScript.ORDER_ATOMIC));
	var selectedByIndex = Bot.utils.chooseByIndex('DURATIONUNIT', index);
	var code = (selectedByIndex === null) ? durationunit_list : selectedByIndex;
	code = '\'' + code + '\'';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
