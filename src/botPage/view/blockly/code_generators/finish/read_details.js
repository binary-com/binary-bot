Blockly.JavaScript.read_details = function(block) {
  let detailIndex = block.getFieldValue('DETAIL_INDEX');
  let code = `details[${parseInt(detailIndex.trim(), 10) - 1}]`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
