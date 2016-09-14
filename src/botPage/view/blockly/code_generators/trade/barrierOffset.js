Blockly.JavaScript.barrier_offset = function barrier_offset(block) {
  const barrierOffsetType = block.getFieldValue('BARRIEROFFSETTYPE_LIST');
  const barrierOffset = Blockly.JavaScript.valueToCode(block, 'BARRIEROFFSET_IN', Blockly.JavaScript.ORDER_ATOMIC);
  const code = barrierOffsetType + Number(barrierOffset);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

