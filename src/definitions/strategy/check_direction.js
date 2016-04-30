Blockly.Blocks.check_direction = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Direction is"))
				.appendField(new Blockly.FieldDropdown(Bot.config.lists.CHECK_DIRECTION), "CHECK_DIRECTION");
    this.setOutput(true, "Boolean");
    this.setColour(180);
    this.setTooltip(i18n._('True if the direction matches the selection'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_strategy(this, ev, 'Check Direction');
	},
};
