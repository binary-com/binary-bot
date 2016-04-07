// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335

Blockly.Blocks['tick'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tick Value");
    this.setOutput(true, "String");
    this.setColour(180);
    this.setTooltip('Returns the tick value received by a strategy block');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().tick(this, ev);
	},
};
