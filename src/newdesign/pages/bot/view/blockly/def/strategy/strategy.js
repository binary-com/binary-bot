// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u7tjez
var blockly = require('blockly');
var i18n = require('i18n');

blockly.Blocks.on_strategy = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Strategy (Decide when to purchase with each tick)"));
    this.appendStatementInput("STRATEGY_STACK")
        .setCheck('Purchase');
    this.setColour(290);
    this.setTooltip(i18n._('This block decides what to do each time a new tick is received'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
