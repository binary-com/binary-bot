Blockly.JavaScript['on_strategy'] = function(block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
  var code = 'Bot.strategy = function strategy(tick, direction){\n' + stack + '\n};\n';
  return code;
};
