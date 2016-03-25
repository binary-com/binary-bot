Blockly.JavaScript['purchase'] = function(block) {
	var choice = eval(Blockly.JavaScript.valueToCode(block, 'CHOICE', Blockly.JavaScript.ORDER_ATOMIC));
	var code = 'Bot.server.purchase(' + choice + ');\n';
	return code;
};
