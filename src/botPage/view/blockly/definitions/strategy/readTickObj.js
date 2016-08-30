'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog

import config from 'const';
import { translator } from 'translator';

import RelationChecker from '../../relationChecker';

Blockly.Blocks.read_tick_obj = {
	init: function() {
		this.appendValueInput("TICKOBJ")
			.setCheck(null)
			.appendField("Tick")
			.appendField(new Blockly.FieldDropdown(config.tickFields), "TICKFIELD_LIST");
		this.setInputsInline(false);
    this.setOutput(true, null);
		this.setColour("#f2f2f2");
		this.setTooltip(translator.translateText('Read a field from a tick (received from ticks list)'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev){
		var relationChecker = new RelationChecker();
		relationChecker.inside_strategy(this, ev, 'Tick');
	},
};
