Blockly.JavaScript.on_strategy = function on_strategy(block) {
  const stack = Blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
	const code = `function on_strategy(ticks, proposals, _strategyCtrl){
	if(_strategyCtrl === null) return; 
	${stack}
	}
	`;
  return code;
};
