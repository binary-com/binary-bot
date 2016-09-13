Blockly.JavaScript.during_purchase = function duringPurchase(block) {
  let stack = Blockly.JavaScript.statementToCode(block, 'DURING_PURCHASE_STACK');
	let code = `function during_purchase(ticks, openProposal, strategyCtrl){
	if(strategyCtrl === null) return; 
	${stack}
	}
	`;
  return code;
};
