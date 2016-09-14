Blockly.JavaScript.notify = function notify(block) {
  const notificationType = block.getFieldValue('NOTIFICATION_TYPE');
  const message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
  const code = 'Bot.log( ' + message + ', \'' + notificationType + '\');\n';
  return code;
};
