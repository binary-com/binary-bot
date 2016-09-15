Blockly.JavaScript.purchase = function purchase(block) {
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `_strategyCtrl.purchase('${purchaseList}');\n`;
  return code;
};
