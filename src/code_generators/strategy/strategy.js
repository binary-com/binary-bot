var blockly = require('blockly');
blockly.JavaScript.on_strategy = function(block) {
  var stack = blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
  var code = 'Bot.globals.on_strategy = function on_strategy(tick, direction){\n' + stack + '\n};\n';
  return code;
};
