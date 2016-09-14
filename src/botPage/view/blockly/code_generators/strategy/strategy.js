Blockly.JavaScript.on_strategy = function(block) {
  let stack = Blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
	let code = `function on_strategy(ticks, proposals, _strategyCtrl){
	if(_strategyCtrl === null) return; 
	${stack}
	}
	`;
  return code;
};
