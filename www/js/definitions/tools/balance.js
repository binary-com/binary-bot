// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kqvz7z

Blockly.Blocks['balance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Balance:")
        .appendField(new Blockly.FieldDropdown([["string", "STR"], ["number", "NUM"]]), "BALANCE_TYPE");
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip('Get balance number or string');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
