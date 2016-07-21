'use strict';
import blockly from 'blockly';
blockly.JavaScript.on_finish = function(block) {
  var stack = blockly.JavaScript.statementToCode(block, 'FINISH_STACK');
  var code = 'function on_finish(_finishedContract){\n' + stack + '\n}\n';
  return code;
};
