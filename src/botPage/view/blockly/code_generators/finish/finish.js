Blockly.JavaScript.on_finish = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
  const code = `function on_finish(_finishedContract, details){\n${stack}\nBot.stop();\n}\n`;
  return code;
};
