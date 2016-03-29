Blockly.getMainWorkspace().getBlockById('trade').setDeletable(false);
Blockly.getMainWorkspace().getBlockById('strategy').setDeletable(false);
Blockly.getMainWorkspace().getBlockById('strategy').getInput('STACK').setCheck('Purchase');
Blockly.getMainWorkspace().getBlockById('finish').setDeletable(false);
Blockly.getMainWorkspace().getBlockById('finish').getInput('STACK').setCheck('TradeAgain');
Bot.utils.updateTokenList();
Bot.utils.addPurchaseOptions();
