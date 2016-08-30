'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e54skh

import { translator } from '../../../../../common/translator';

import RelationChecker from '../../relationChecker';

Blockly.Blocks.contract_result = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText("Contract Result"));
    this.setOutput(true, "String");
    this.setColour("#f2f2f2");
    this.setTooltip(translator.translateText('Returns the result of the finished contract'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		var relationChecker = new RelationChecker();
		relationChecker.inside_finish(this, ev, 'Contract Result');
	},
};

