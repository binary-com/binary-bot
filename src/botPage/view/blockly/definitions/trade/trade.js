'use strict';

import { translator } from 'translator';

import RelationChecker from '../../relationChecker';
Blockly.Blocks.trade = {
	init: function () {
		this.appendDummyInput()
	        .appendField(translator.translateText("Step 1: Define Trade"));
	    this.appendStatementInput("SUBMARKET")
	        .setCheck('Submarket');
		this.setPreviousStatement(true, null);
		this.setColour('#2a3052');
		this.setTooltip(translator.translateText('Use this block to choose markets and trade types.'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function (ev) {
		var relationChecker = new RelationChecker();
		relationChecker.trade(this, ev);
	},
};
