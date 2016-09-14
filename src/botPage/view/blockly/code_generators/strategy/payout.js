Blockly.JavaScript.payout = function(block) {
  if (this.parentBlock_ === null) {
    return '';
  }
  let purchaseList = block.getFieldValue('PURCHASE_LIST');
  let code = `Number(_strategyCtrl.getContract('${purchaseList}').payout)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
