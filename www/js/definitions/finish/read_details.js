// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u8i287

Blockly.Blocks['read_details'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Contract Detail:")
        .appendField(new Blockly.FieldDropdown(Bot.config.lists.DETAILS), "DETAIL_INDEX");
		this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip('Reads a selected option from contract details list');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		Bot.utils.getRelationChecker().inside_finish(this, ev, 'Read Contract Details');
	},
};
