'use strict';
var blockly = require('blockly');
blockly.JavaScript.notify = function(block) {
  var notification_type = block.getFieldValue('NOTIFICATION_TYPE');
  var message = blockly.JavaScript.valueToCode(block, 'MESSAGE', blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'observer.emit(\'ui.log.'+ notification_type +'\', ' + message + ');\n';
  return code;
};
