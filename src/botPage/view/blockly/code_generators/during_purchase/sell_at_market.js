Blockly.JavaScript.sell_at_market = function sell_at_market(block) {
  const sell_at_marketList = block.getFieldValue('PURCHASE_LIST');
  const code = `_strategyCtrl.sell_at_market('${sell_at_marketList}');\n`;
  return code;
};
