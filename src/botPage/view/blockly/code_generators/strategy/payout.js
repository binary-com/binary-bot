'use strict';

Blockly.JavaScript.payout = function(block) {
	if ( this.parentBlock_ === null ) {
		return '';
	}
	var purchase_list = block.getFieldValue('PURCHASE_LIST');
	var code = purchase_list;
	code = 'Number(_strategyCtrl.getContract(\'' + code + '\').payout)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
