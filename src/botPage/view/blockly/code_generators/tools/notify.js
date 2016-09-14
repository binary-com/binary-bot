Blockly.JavaScript.notify = function(block) {
  let notificationType = block.getFieldValue('NOTIFICATION_TYPE');
  let message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
  let code = 'Bot.log( ' + message + ', \'' + notificationType + '\');\n';
  return code;
};
