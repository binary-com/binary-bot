Blockly.JavaScript['on_finish'] = function(block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
  var code = 'Bot.on_finish = function on_finish(result, details){\n' + stack + '\n};\n';
  return code;
};
