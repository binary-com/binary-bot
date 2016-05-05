var blockly = require('blockly');
blockly.JavaScript.on_finish = function(block) {
  var stack = blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
  var code = 'Bot.globals.on_finish = function on_finish(result, details){\n' + stack + '\n};\n';
  return code;
};
