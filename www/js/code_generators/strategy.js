Blockly.JavaScript['on_strategy'] = function(block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
  var code = 'Bot.on_strategy = function on_strategy(tick, direction){\n' + stack + '\n};\n';
  return code;
};
