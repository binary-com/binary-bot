'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335


import RelationChecker from '../../relationChecker';
import { translator } from 'translator';


Blockly.Blocks.ohlc = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText("Candles List"));
    this.setOutput(true, "Array");
    this.setColour("#f2f2f2");
    this.setTooltip(translator.translateText('Returns the ohlc list'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		var relationChecker = new RelationChecker();
		relationChecker.inside_strategy(this, ev, 'Candles List');
	},
};
