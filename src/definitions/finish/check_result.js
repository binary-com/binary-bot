Blockly.Blocks.contract_check_result = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Result is"))
				.appendField(new Blockly.FieldDropdown(Bot.config.lists.CHECK_RESULT), "CHECK_RESULT");
    this.setOutput(true, "Boolean");
    this.setColour(180);
    this.setTooltip(i18n._('True if the result matches the selection'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_finish(this, ev, 'Check Result');
	},
};
