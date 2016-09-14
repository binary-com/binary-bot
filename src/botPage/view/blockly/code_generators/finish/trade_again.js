Blockly.JavaScript.trade_again = function trade_again() {
  if (this.parentBlock_ === null) { // eslint-disable-line no-underscore-dangle
    return '';
  }
  const code = 'trade(true);\nreturn;\n';
  return code;
};
