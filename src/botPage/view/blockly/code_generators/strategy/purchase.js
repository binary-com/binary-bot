Blockly.JavaScript.purchase = function purchase(block) {
  if (this.parentBlock_ === null) { // eslint-disable-line no-underscore-dangle
    return '';
  }
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `_strategyCtrl.purchase('${purchaseList}');\n`;
  return code;
};
