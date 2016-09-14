Blockly.JavaScript.check_direction = function(block) {
  let checkWith = block.getFieldValue('CHECK_DIRECTION');
  let code = `(ticks.direction === '${checkWith}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
