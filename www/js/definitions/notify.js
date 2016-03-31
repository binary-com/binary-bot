// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pmhydb

Blockly.Blocks['notify'] = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField("Notify type:")
        .appendField(new Blockly.FieldDropdown([["success", "success"], ["information", "info"], ["warning", "warn"], ["error", "error"]]), "NOTIFICATION_TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('Creates notification');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
