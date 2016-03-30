Blockly.Blocks['trade'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Trade");
		this.appendValueInput("ACCOUNT")
			.setCheck("Number")
			.appendField("With Account:")
			.appendField(new Blockly.FieldDropdown(Bot.server.getAccounts), "ACCOUNT_LIST");
		this.setInputsInline(true);
		this.appendStatementInput("SUBMARKET")
			.setCheck("Submarket")
			.appendField("Submarket");
		this.setPreviousStatement(true, 'Trade');
		this.setNextStatement(true, 'Submarket');
		this.setColour(60);
		this.setTooltip('The trade block that logs in to the binary API and makes the contracts defined by submarket blocks. Accepts index to choose between the accounts.');
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	}, 
	onchange: function(ev){
		if ( ev.type === 'change' && ev.blockId && ev.blockId === 'strategy' ) {
			Array.prototype.slice.apply(Blockly.mainWorkspace.getTopBlocks()).forEach(function(block){
				switch(block.id) {
					case 'strategy':
						block.inputList[0].fieldRow[1].setText('decide when to purchase with each tick');
						break;
					case 'finish':
						block.inputList[0].fieldRow[1].setText('decide what to do after the contract is finished');
						break;
					default:
						break;
				}
			});
		}
		Bot.utils.unplugErrors.trade(this, ev);
	},
};
