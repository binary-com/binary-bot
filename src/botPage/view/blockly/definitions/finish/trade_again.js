'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#xkasg4

import Translator from 'translator';
var translator = new Translator();
import RelationChecker from '../../relationChecker';

Blockly.Blocks.trade_again = {
	init: function() {
		this.appendDummyInput()
			.appendField(translator.translateText("Trade Again"));
		this.setPreviousStatement(true, 'TradeAgain');
		this.setColour("#f2f2f2");
		this.setTooltip(translator.translateText('Runs the trade block again'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev) {
		var relationChecker = new RelationChecker();
		relationChecker.inside_finish(this, ev, 'Trade Again');
	},
};
