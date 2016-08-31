Blockly.JavaScript.trade_again = function() {
  if (this.parentBlock_ === null) {
    return '';
  }
  let code = 'trade(true);\nreturn;\n';
  return code;
};
