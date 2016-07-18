// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kqvz7z
var blockly = require('blockly');
var i18n = require('i18n');

blockly.Blocks.balance = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText("Balance:"))
        .appendField(new blockly.FieldDropdown([[translator.translateText("string"), "STR"], [translator.translateText("number"), "NUM"]]), "BALANCE_TYPE");
    this.setOutput(true, null);
    this.setColour("#dedede");
    this.setTooltip(translator.translateText('Get balance number or string'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
