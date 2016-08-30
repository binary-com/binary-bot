'use strict';

import { translator } from 'translator';

import RelationChecker from '../../relationChecker';
import config from 'const';
Blockly.Blocks.check_direction = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText("Direction is"))
				.appendField(new Blockly.FieldDropdown(config.lists.CHECK_DIRECTION), "CHECK_DIRECTION");
    this.setOutput(true, "Boolean");
    this.setColour("#f2f2f2");
    this.setTooltip(translator.translateText('True if the direction matches the selection'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		var relationChecker = new RelationChecker();
		relationChecker.inside_strategy(this, ev, 'Check Direction');
	},
};
