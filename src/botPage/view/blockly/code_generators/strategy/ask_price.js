Blockly.JavaScript.ask_price = function(block) {
  if (this.parentBlock_ === null) {
    return '';
  }
  let purchaseList = block.getFieldValue('PURCHASE_LIST');
  let code = `Number(_strategyCtrl.getContract('${purchaseList}').ask_price)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
