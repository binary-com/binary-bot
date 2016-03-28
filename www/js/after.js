Bot.notify = $.notify;
Bot.workspace = Blockly.getMainWorkspace();

Bot.workspace.getBlockById('trade').setDeletable(false);
Bot.workspace.getBlockById('strategy').setDeletable(false);
Bot.workspace.getBlockById('finish').setDeletable(false);
var tokenList = Bot.utils.storageManager.getTokenList();
if ( tokenList.length !== 0 ) {
	Bot.workspace.getBlockById('trade').getField('ACCOUNT_LIST').setValue(tokenList[0].token);
}
Bot.utils.addPurchaseOptions();
