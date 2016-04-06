Blockly.JavaScript['notify'] = function(block) {
  var notification_type = block.getFieldValue('NOTIFICATION_TYPE');
  var message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'Bot.utils.log('+ message +', \''+ notification_type +'\', \'bottom left\');\n';
  return code;
};
