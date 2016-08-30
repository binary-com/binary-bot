'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335


import RelationChecker from '../../relationChecker';
import { translator } from '../../../../../common/translator';


Blockly.Blocks.ticks_with_time = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText("Ticks (Time, Value) List"));
    this.setOutput(true, "Array");
    this.setColour("#f2f2f2");
    this.setTooltip(translator.translateText('Returns the list of ticks'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		var relationChecker = new RelationChecker();
		relationChecker.inside_strategy(this, ev, 'Ticks (Time, Value) List');
	},
};
