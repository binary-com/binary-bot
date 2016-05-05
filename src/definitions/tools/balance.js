// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kqvz7z
var blockly = require('blockly');
var i18n = require('i18n');

blockly.Blocks.balance = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Balance:"))
        .appendField(new blockly.FieldDropdown([[i18n._("string"), "STR"], [i18n._("number"), "NUM"]]), "BALANCE_TYPE");
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip(i18n._('Get balance number or string'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
