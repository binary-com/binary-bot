// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i7qkfj
var blockly = require('blockly');
var i18n = require('i18n');

blockly.Blocks.on_finish = {
  init: function() {
    this.appendDummyInput()
        .appendField(i18n._("On Finish (Decide what to do after the contract is finished)"));
    this.appendStatementInput("FINISH_STACK")
        .setCheck("TradeAgain");
    this.setColour(290);
    this.setTooltip(i18n._('This block decides what to do when a purchased contract is finished'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
