// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u9tgts

Blockly.Blocks['on_contract_finished'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("On Finish (Decide what to do after the contract is finished)");
    this.appendStatementInput("FINISH_STACK")
        .setCheck("TradeAgain");
    this.setColour(290);
    this.setTooltip('This block decides what to do when a purchased contract is finished');
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  }
};
