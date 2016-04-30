// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kqvz7z

Blockly.Blocks.balance = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Balance:"))
        .appendField(new Blockly.FieldDropdown([[i18n._("string"), "STR"], [i18n._("number"), "NUM"]]), "BALANCE_TYPE");
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip(i18n._('Get balance number or string'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
