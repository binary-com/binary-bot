// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pmhydb
var blockly = require('blockly');
var i18n = require('i18n');

blockly.Blocks.notify = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField(i18n._("Notify type:"))
        .appendField(new blockly.FieldDropdown([[i18n._("success"), "success"], [i18n._("information"), "info"], [i18n._("warning"), "warn"], [i18n._("error"), "error"]]), "NOTIFICATION_TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip(i18n._('Creates notification'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
