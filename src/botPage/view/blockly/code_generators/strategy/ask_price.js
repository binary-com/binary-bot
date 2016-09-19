Blockly.JavaScript.ask_price = (block) => {
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `Number(purchaseCtrl.getContract('${purchaseList}').ask_price)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
