// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#e54skh

Blockly.Blocks['contract_result'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Contract Result");
    this.setOutput(true, "String");
    this.setColour(180);
    this.setTooltip('Returns the result of the finished contract');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().contract_result(this, ev);
	},
};

