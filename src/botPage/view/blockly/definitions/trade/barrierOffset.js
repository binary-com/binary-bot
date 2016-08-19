'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yn3rh2

import config from 'const';
import Translator from 'translator';
var translator = new Translator();
import RelationChecker from '../../relationChecker';

Blockly.Blocks.barrier_offset = {
	init: function() {
		this.appendValueInput("BARRIEROFFSET_IN")
			.setCheck("Number")
			.appendField(new Blockly.FieldDropdown(config.barrierTypes), "BARRIEROFFSETTYPE_LIST");
		this.setInputsInline(false);
		this.setOutput(true, "BarrierOffset");
		this.setColour("#dedede");
		this.setTooltip(translator.translateText('Add sign to a number to make a Barrier Offset.'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev){
		var relationChecker = new RelationChecker();
		relationChecker.inside_trade(this, ev, 'Barrier Offset');
	},
};
