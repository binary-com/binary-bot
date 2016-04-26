Blockly.Blocks['contract_loss'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Loss");
    this.setOutput(true, "Boolean");
    this.setColour(180);
    this.setTooltip('True if the tick direction is loss');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_finish(this, ev, 'Loss');
	},
};
