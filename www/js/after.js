Blockly.mainWorkspace.getBlockById('trade').setDeletable(false);
Blockly.mainWorkspace.getBlockById('strategy').setDeletable(false);
Blockly.mainWorkspace.getBlockById('finish').setDeletable(false);
Bot.utils.updateTokenList();
Bot.utils.addPurchaseOptions();
Bot.welcome.welcome();
Blockly.mainWorkspace.clearUndo();

