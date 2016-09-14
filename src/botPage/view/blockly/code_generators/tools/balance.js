Blockly.JavaScript.balance = function(block) {
  let balanceType = block.getFieldValue('BALANCE_TYPE');
  let code = `Bot.getBalance('${balanceType}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
