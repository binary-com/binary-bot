Blockly.JavaScript.purchase = (block) => {
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `_purchaseCtrl.purchase('${purchaseList}');\n`;
  return code;
};
