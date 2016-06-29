// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
var blockly = require('blockly');
var i18n = require('i18n');

blockly.Blocks.on_finish = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("Step 3: Finish"));
    this.appendStatementInput("FINISH_STACK")
        .setCheck("TradeAgain");
    this.setColour('#2a3052');
    this.setTooltip(i18n._('This block decides what to do when a purchased contract is finished'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
