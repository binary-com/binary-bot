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
	}, 
	onchange: function(ev){
		if ( this.childBlocks_.length > 0 && Bot.config.ticktrade_markets.indexOf(this.childBlocks_[0].type) < 0 ) {
			Array.prototype.slice.apply(this.childBlocks_).forEach(function(child){
				child.unplug();
			});
		}
		var topParent = Bot.utils.findTopParentBlock(this);
		if ( topParent !== null ) { 
			if ( Bot.config.ticktrade_markets.indexOf(topParent.type) >= 0 || topParent.id === 'strategy' || topParent.id === 'finish' ) {
				this.unplug();
			} 
		} 
	},
};
