Blockly.JavaScript.on_finish = function(block) {
  let stack = Blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
  let code = `function on_finish(_finishedContract, details){\n${stack}\nBot.stop();\n}\n`;
  return code;
};
