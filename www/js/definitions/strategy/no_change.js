Blockly.Blocks['direction_no_change'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("No Change");
    this.setOutput(true, "Boolean");
    this.setColour(180);
    this.setTooltip('True if the tick direction is No Change');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_strategy(this, ev, 'No Change');
	},
};
