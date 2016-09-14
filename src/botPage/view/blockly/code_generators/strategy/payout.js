Blockly.JavaScript.payout = function payout(block) {
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `Number(_strategyCtrl.getContract('${purchaseList}').payout)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
