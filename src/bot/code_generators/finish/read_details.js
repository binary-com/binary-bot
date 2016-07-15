var blockly = require('blockly');
blockly.JavaScript.read_details = function(block) {
  var detail_index = block.getFieldValue('DETAIL_INDEX');
  // TODO: Assemble JavaScript into code variable.
  var code = '((details instanceof Array && details.length === Bot.config.lists.DETAILS.length) ? details[' + ( parseInt(detail_index.trim()) - 1 ) + '] : \'\' )';
  return [code, blockly.JavaScript.ORDER_ATOMIC];
};
