Blockly.JavaScript.payout = (block) => {
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `Number(purchaseCtrl.getContract('${purchaseList}').payout)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
