Blockly.Blocks['direction_up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Up");
    this.setOutput(true, "Boolean");
    this.setColour(180);
    this.setTooltip('True if the tick direction is Up');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_strategy(this, ev, 'Up');
	},
};
