Blockly.JavaScript.barrier_offset = function(block) {
  let barrierOffsetType = block.getFieldValue('BARRIEROFFSETTYPE_LIST');
  let barrierOffset = Blockly.JavaScript.valueToCode(block, 'BARRIEROFFSET_IN', Blockly.JavaScript.ORDER_ATOMIC);
  let code = barrierOffsetType + Number(barrierOffset);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

