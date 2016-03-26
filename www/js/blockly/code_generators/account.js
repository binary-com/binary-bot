Blockly.JavaScript['account'] = function(block) {
	var account_list = block.getFieldValue('ACCOUNT_LIST');
	var index = eval(Blockly.JavaScript.valueToCode(block, 'ACCOUNT', Blockly.JavaScript.ORDER_ATOMIC));
	var selectedByIndex = Bot.utils.chooseByIndex('ACCOUNT', index, Bot.server.accounts);
	if ( index === 1 ) { // do not allow the first item 
		selectedByIndex = null;
	}
	var code = (selectedByIndex === null) ? account_list : selectedByIndex;
	code = '\'' + code + '\'';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
