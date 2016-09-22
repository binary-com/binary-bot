Blockly.JavaScript.read_ohlc_obj = (block) => {
  const ohlcField = block.getFieldValue('OHLCFIELD_LIST');
  const ohlcObj = Blockly.JavaScript.valueToCode(block, 'OHLCOBJ', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (ohlcObj) {
    code = `((${ohlcObj} instanceof Array)? ${ohlcObj}.slice(-1)[0] : ${ohlcObj}).${ohlcField}`;
  } else {
    code = `ticks.ohlc.slice(-1)[0].${ohlcField}`;
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
