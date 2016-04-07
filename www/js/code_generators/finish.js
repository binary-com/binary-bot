Blockly.JavaScript['on_contract_finished'] = function(block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
  var code = 'Bot.finish = function finish(result, details){\n' + stack + '\n};\n';
  return code;
};
