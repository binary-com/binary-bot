Blockly.JavaScript.ask_price = function ask_price(block) {
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `Number(_strategyCtrl.getContract('${purchaseList}').ask_price)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
