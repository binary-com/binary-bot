Blockly.JavaScript.contract_check_result = function(block) {
  let checkWith = block.getFieldValue('CHECK_RESULT');
  let code = `(details[10] === '${checkWith}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
