Blockly.JavaScript.read_ohlc_obj = function(block) {
  let ohlcField = block.getFieldValue('OHLCFIELD_LIST');
  let ohlcObj = Blockly.JavaScript.valueToCode(block, 'OHLCOBJ', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `((${ohlcObj} instanceof Array)? ${ohlcObj}.slice(-1)[0] : ${ohlcObj}).${ohlcField}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
