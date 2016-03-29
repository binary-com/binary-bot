Bot.notify = $.notify;
Blockly.getMainWorkspace().getBlockById('trade').setDeletable(false);
Blockly.getMainWorkspace().getBlockById('strategy').setDeletable(false);
Blockly.getMainWorkspace().getBlockById('finish').setDeletable(false);
var tokenList = Bot.utils.storageManager.getTokenList();
if ( tokenList.length !== 0 ) {
	Blockly.getMainWorkspace().getBlockById('trade').getField('ACCOUNT_LIST').setValue(tokenList[0].token);
}
Bot.utils.addPurchaseOptions();
