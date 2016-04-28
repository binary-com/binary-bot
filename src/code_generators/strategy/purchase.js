Blockly.JavaScript['purchase'] = function(block) {
	if ( this.parentBlock_ === null ) {
		return '';
	}
	var purchase_list = block.getFieldValue('PURCHASE_LIST');
	var code = purchase_list;
	code = 'Bot.server.purchase(\'' + code + '\');\n';
	return code;
};
