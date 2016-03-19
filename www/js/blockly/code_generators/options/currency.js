Blockly.JavaScript['currency'] = function(block) {
	var currency_list = block.getFieldValue('CURRENCY_LIST');
	var index = eval(Blockly.JavaScript.valueToCode(block, 'CURRENCY', Blockly.JavaScript.ORDER_ATOMIC));
	var selectedByIndex = Bot.utils.chooseByIndex('CURRENCY', index);
	var code = (selectedByIndex === null) ? currency_list : selectedByIndex;
	code = '\'' + code + '\'';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
