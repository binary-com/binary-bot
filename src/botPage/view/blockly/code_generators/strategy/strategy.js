var blockly = require('blockly');
blockly.JavaScript.on_strategy = function(block) {
  var stack = blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
  var code = 'function on_strategy(ticks, proposals, _strategyCtrl){\n' + stack + '\n}\n';
  return code;
};
