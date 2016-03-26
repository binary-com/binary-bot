Blockly.JavaScript['purchase'] = function(block) {
	var purchase_list = block.getFieldValue('PURCHASE_LIST');
	var index = eval(Blockly.JavaScript.valueToCode(block, 'PURCHASE', Blockly.JavaScript.ORDER_ATOMIC));
	var selectedByIndex = Bot.utils.chooseByIndex('PURCHASE', index, Bot.server.purchase_choices);
	var code = (selectedByIndex === null) ? purchase_list : selectedByIndex;
	code = 'Bot.server.purchase(' + code + ');\n';
	return code;
};
