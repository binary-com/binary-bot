var blockly = require('blockly');
var i18n = require('i18n');
var relationChecker = require('../../utils/relationChecker');
var config = require('../../globals/config');
blockly.Blocks.check_direction = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Direction is"))
				.appendField(new blockly.FieldDropdown(config.lists.CHECK_DIRECTION), "CHECK_DIRECTION");
    this.setOutput(true, "Boolean");
    this.setColour("#f2f2f2");
    this.setTooltip(i18n._('True if the direction matches the selection'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		relationChecker.inside_strategy(this, ev, 'Check Direction');
	},
};
