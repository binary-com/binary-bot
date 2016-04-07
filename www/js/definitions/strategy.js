// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u7tjez

Blockly.Blocks['on_strategy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Strategy (Decide when to purchase with each tick)");
    this.appendStatementInput("STRATEGY_STACK")
        .setCheck('Purchase');
    this.setColour(290);
    this.setTooltip('This block decides what to do each time a new tick is received');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
