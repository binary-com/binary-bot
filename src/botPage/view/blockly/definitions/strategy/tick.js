'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335

var blockly = require('blockly');
var relationChecker = require('../../relationChecker');
var Translator = require('translator');
var translator = new Translator();

blockly.Blocks.tick = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText("Tick Value"));
    this.setOutput(true, "Number");
    this.setColour("#f2f2f2");
    this.setTooltip(translator.translateText('Returns the tick value received by a strategy block'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		relationChecker.inside_strategy(this, ev, 'Tick Value');
	},
};
