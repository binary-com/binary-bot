'use strict';
Blockly.JavaScript.read_ohlc_obj = function(block) {
	var ohlcField = block.getFieldValue('OHLCFIELD_LIST');
	var ohlcObj = Blockly.JavaScript.valueToCode(block, 'OHLCOBJ', Blockly.JavaScript.ORDER_ATOMIC);
	var code = '((' + ohlcObj + ' instanceof Array)?' + ohlcObj + '.slice(-1)[0]:' + ohlcObj + ')' + '.' + ohlcField;
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
