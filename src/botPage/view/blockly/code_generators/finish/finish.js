'use strict';

Blockly.JavaScript.on_finish = function(block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
  var code = 'function on_finish(_finishedContract, details){\n' + stack + '\n}\n';
  return code;
};
