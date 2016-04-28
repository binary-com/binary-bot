Blockly.Blocks['contract_win'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Win");
    this.setOutput(true, "Boolean");
    this.setColour(180);
    this.setTooltip('True if the tick direction is win');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_finish(this, ev, 'Win');
	},
};
