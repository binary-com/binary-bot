// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u8i287
var blockly = require('blockly');
var i18n = require('i18n');
var relationChecker = require('../../utils/relationChecker');
var config = require('../../globals/config');

blockly.Blocks.read_details = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Contract Detail:"))
        .appendField(new blockly.FieldDropdown(config.lists.DETAILS), "DETAIL_INDEX");
		this.setOutput(true, null);
    this.setColour("#f2f2f2");
    this.setTooltip(i18n._('Reads a selected option from contract details list'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		relationChecker.inside_finish(this, ev, 'Read Contract Details');
	},
};
