var blockly = require('blockly');
var i18n = require('i18n');
var config = require('../../globals/config');
var relationChecker = require('../../utils/relationChecker');
blockly.Blocks.contract_check_result = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Result is"))
				.appendField(new blockly.FieldDropdown(config.lists.CHECK_RESULT), "CHECK_RESULT");
    this.setOutput(true, "Boolean");
    this.setColour("#f2f2f2");
    this.setTooltip(i18n._('True if the result matches the selection'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		relationChecker.inside_finish(this, ev, 'Check Result');
	},
};
