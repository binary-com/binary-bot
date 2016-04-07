// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4

Blockly.Blocks['total_profit'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Total Profit");
    this.setOutput(true, "Number");
    this.setColour(180);
    this.setTooltip('Returns the total profit since the bot page is opened');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
