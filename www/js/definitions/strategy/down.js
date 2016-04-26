Blockly.Blocks['direction_down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Down");
    this.setOutput(true, "Boolean");
    this.setColour(180);
    this.setTooltip('True if the tick direction is Down');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_strategy(this, ev, 'Down');
	},
};
