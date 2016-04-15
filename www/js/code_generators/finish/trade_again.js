Blockly.JavaScript['trade_again'] = function(block) {
	if ( this.parentBlock_ === null ) {
		return '';
	}
	var code = 'trade(true);\n';
	return code;
};
