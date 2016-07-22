'use strict';

import config from 'const';
import relationChecker from '../../relationChecker';
import Translator from 'translator';
var translator = new Translator();
Blockly.Blocks.contract_check_result = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText("Result is"))
				.appendField(new Blockly.FieldDropdown(config.lists.CHECK_RESULT), "CHECK_RESULT");
    this.setOutput(true, "Boolean");
    this.setColour("#f2f2f2");
    this.setTooltip(translator.translateText('True if the result matches the selection'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		relationChecker.inside_finish(this, ev, 'Check Result');
	},
};
