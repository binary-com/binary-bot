Blockly.getMainWorkspace().getBlockById('trade').setDeletable(false);
Blockly.getMainWorkspace().getBlockById('strategy').setDeletable(false);
Blockly.getMainWorkspace().getBlockById('strategy').getInput('STACK').setCheck('Purchase');
Blockly.getMainWorkspace().getBlockById('finish').setDeletable(false);
Blockly.getMainWorkspace().getBlockById('finish').getInput('STACK').setCheck('TradeAgain');
var tokenList = Bot.utils.storageManager.getTokenList();
if ( tokenList.length !== 0 ) {
	Blockly.getMainWorkspace().getBlockById('trade').getField('ACCOUNT_LIST').setValue(tokenList[0].token);
}
Bot.utils.addPurchaseOptions();
