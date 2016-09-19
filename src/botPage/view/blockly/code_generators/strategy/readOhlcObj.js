Blockly.JavaScript.read_ohlc_obj = (block) => {
  const ohlcField = block.getFieldValue('OHLCFIELD_LIST');
  const ohlcObj = Blockly.JavaScript.valueToCode(block, 'OHLCOBJ', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `((${ohlcObj} instanceof Array)? ${ohlcObj}.slice(-1)[0] : ${ohlcObj}).${ohlcField}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
