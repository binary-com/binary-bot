Blockly.JavaScript.balance = (block) => {
  const balanceType = block.getFieldValue('BALANCE_TYPE');
  const code = `Bot.getBalance('${balanceType}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
