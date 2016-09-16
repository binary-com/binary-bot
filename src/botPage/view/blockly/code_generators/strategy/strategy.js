Blockly.JavaScript.on_strategy = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
	const code = `function on_strategy(ticks, proposals, _purchaseCtrl){
	if(_purchaseCtrl === null) return; 
	${stack}
	}
	`;
  return code;
};
