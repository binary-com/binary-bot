'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335


import relationChecker from '../../relationChecker';
import Translator from 'translator';
var translator = new Translator();

Blockly.Blocks.ticks = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText("Ticks List"));
    this.setOutput(true, "Array");
    this.setColour("#f2f2f2");
    this.setTooltip(translator.translateText('Returns the list of ticks'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		relationChecker.inside_strategy(this, ev, 'Ticks List');
	},
};
