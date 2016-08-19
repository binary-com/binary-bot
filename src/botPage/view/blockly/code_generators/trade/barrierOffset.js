'use strict';
Blockly.JavaScript.barrier_offset = function(block) {
	var barrierOffsetType = block.getFieldValue('BARRIEROFFSETTYPE_LIST');
	var barrierOffset = Blockly.JavaScript.valueToCode(block, 'BARRIEROFFSET_IN', Blockly.JavaScript.ORDER_ATOMIC);
	var code = barrierOffsetType + Number(barrierOffset);
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

