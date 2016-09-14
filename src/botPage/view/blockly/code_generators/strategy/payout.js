Blockly.JavaScript.payout = function payout(block) {
  if (this.parentBlock_ === null) { // eslint-disable-line no-underscore-dangle
    return '';
  }
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `Number(_strategyCtrl.getContract('${purchaseList}').payout)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
