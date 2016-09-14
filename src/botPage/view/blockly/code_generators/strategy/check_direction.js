Blockly.JavaScript.check_direction = function check_direction(block) {
  const checkWith = block.getFieldValue('CHECK_DIRECTION');
  const code = `(ticks.direction === '${checkWith}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
