// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#x6s6zt

Blockly.Blocks['read_details'] = {
  init: function() {
    this.appendValueInput("DETAILS")
        .setCheck("Array")
        .appendField("Read Detail:")
        .appendField(new Blockly.FieldDropdown(Bot.config.lists.DETAILS), "DETAIL_INDEX");
		this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip('Reads a selected option from details list');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
