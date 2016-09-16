Blockly.JavaScript.during_purchase = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'DURING_PURCHASE_STACK');
	const code = `function during_purchase(openProposal, purchaseCtrl){
	if(purchaseCtrl === null) return; 
	${stack}
	}
	`;
  return code;
};
