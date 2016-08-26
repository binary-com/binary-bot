'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szwuog

import config from 'const';
import Translator from 'translator';
var translator = new Translator();
import RelationChecker from '../../relationChecker';

Blockly.Blocks.read_tick_obj = {
	init: function() {
		this.appendValueInput("TICKOBJ")
			.setCheck(null)
			.appendField("Tick")
			.appendField(new Blockly.FieldDropdown(config.tickFields), "TICKFIELD_LIST");
		this.setInputsInline(false);
    this.setOutput(true, null);
		this.setColour("#dedede");
		this.setTooltip(translator.translateText('Read a field from tick (received from ticks list)'));
		this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
	},
	onchange: function(ev){
	},
};
