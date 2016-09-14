Blockly.JavaScript.contract_check_result = function contract_check_result(block) {
  const checkWith = block.getFieldValue('CHECK_RESULT');
  const code = `(details[10] === '${checkWith}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
