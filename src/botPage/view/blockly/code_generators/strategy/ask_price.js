Blockly.JavaScript.ask_price = function ask_price(block) {
  if (this.parentBlock_ === null) { // eslint-disable-line no-underscore-dangle
    return '';
  }
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `Number(_strategyCtrl.getContract('${purchaseList}').ask_price)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
