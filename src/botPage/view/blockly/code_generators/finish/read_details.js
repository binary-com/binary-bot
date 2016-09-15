Blockly.JavaScript.read_details = function read_details(block) {
  const detailIndex = block.getFieldValue('DETAIL_INDEX');
  const code = `details[${parseInt(detailIndex.trim(), 10) - 1}]`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
