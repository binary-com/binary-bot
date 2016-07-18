// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pmhydb
var blockly = require('blockly');
var i18n = require('i18n');

blockly.Blocks.notify = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField(translator.translateText("Notify type:"))
        .appendField(new blockly.FieldDropdown([[translator.translateText("success"), "success"], [translator.translateText("information"), "info"], [translator.translateText("warning"), "warn"], [translator.translateText("error"), "error"]]), "NOTIFICATION_TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#dedede");
    this.setTooltip(translator.translateText('Creates notification'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
