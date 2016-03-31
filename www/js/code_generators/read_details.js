Blockly.JavaScript['read_details'] = function(block) {
  var detail_index = block.getFieldValue('DETAIL_INDEX');
  var details = Blockly.JavaScript.valueToCode(block, 'DETAILS', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = details.trim() + '[' + ( parseInt(detail_index.trim()) - 1 ) + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
