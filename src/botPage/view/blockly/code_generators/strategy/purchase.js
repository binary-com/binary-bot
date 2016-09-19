Blockly.JavaScript.purchase = (block) => {
  const purchaseList = block.getFieldValue('PURCHASE_LIST');
  const code = `purchaseCtrl.purchase('${purchaseList}');\n`;
  return code;
};
