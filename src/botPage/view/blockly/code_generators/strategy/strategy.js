'use strict';

Blockly.JavaScript.on_strategy = function(block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
  var code = 'function on_strategy(ticks, proposals, _strategyCtrl){\nif(_strategyCtrl === null) return; \n' + stack + '\n}\n';
  return code;
};
