// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e54skh
var blockly = require('blockly');
var i18n = require('i18n');
var relationChecker = require('../../utils/relationChecker');

blockly.Blocks.contract_result = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Contract Result"));
    this.setOutput(true, "String");
    this.setColour("#f2f2f2");
    this.setTooltip(i18n._('Returns the result of the finished contract'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		relationChecker.inside_finish(this, ev, 'Contract Result');
	},
};

