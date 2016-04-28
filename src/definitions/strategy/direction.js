// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n3drko

Blockly.Blocks['direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tick Direction");
    this.setOutput(true, "String");
    this.setColour(180);
    this.setTooltip('Returns the tick direction received by a strategy block, its value could be "up" if the tick is more than before, "down" if less than before and empty ("") if the tick is equal to the previous tick');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_strategy(this, ev, 'Tick Direction');
	},
};

