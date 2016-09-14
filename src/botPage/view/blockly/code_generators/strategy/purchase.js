Blockly.JavaScript.purchase = function(block) {
  if (this.parentBlock_ === null) {
    return '';
  }
  let purchaseList = block.getFieldValue('PURCHASE_LIST');
  let code = `_strategyCtrl.purchase('${purchaseList}');\n`;
  return code;
};
