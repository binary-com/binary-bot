Blockly.mainWorkspace.getBlockById('trade').setDeletable(false);
var strategy = Blockly.mainWorkspace.getBlockById('strategy');
strategy.setDeletable(false);
strategy.getInput('STACK').setCheck('Purchase');
strategy.setTooltip('Aka strategy block, this block decides what to do each time a new tick is received');
var finish = Blockly.mainWorkspace.getBlockById('finish');
finish.setDeletable(false);
finish.getInput('STACK').setCheck('TradeAgain');
finish.setTooltip('Aka finish block, this block decides what to do when a purchased contract is finished');
Bot.utils.updateTokenList();
Bot.utils.addPurchaseOptions();
Bot.welcome.welcome();
Bot.startTutorial = function startTutorial(){
	Bot[$('#tours').val()].start();	
};
