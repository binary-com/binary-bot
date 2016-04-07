Blockly.mainWorkspace.getBlockById('trade').setDeletable(false);
Blockly.mainWorkspace.getBlockById('strategy').setDeletable(false);
Blockly.mainWorkspace.getBlockById('finish').setDeletable(false);
Bot.utils.updateTokenList();
Bot.utils.addPurchaseOptions();
Bot.welcome.welcome();
Bot.startTutorial = function startTutorial(){
	Bot[$('#tours').val()].start();	
};
$('#outputPanel .showPanel').click(function(){
	$('#outputPanel .showPanel').css('display', 'none');
	$('#outputPanel .hidePanel').css('display', 'block');
	$('#outputPanel .results').css('display', 'block');
	$('#outputPanel').animate({right: '0px'}, 1000);
});
$('#outputPanel .hidePanel').click(function(){
	$('#outputPanel .hidePanel').css('display', 'none');
	$('#outputPanel .showPanel').css('display', 'block');
	$('#outputPanel .results').css('display', 'none');
	console.log($('#outputPanel').animate({right: '-185px'}, 300));
});
