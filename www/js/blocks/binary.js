Blockly.Blocks['binary_main'] = {
  init: function() {
		this.appendDummyInput()
				.appendField('Binary');
		this.appendValueInput('account')
        .setCheck("Account")
				.appendField('Account: ');
    this.appendStatementInput("trade")
				.appendField('Trade: ');
    this.setColour(330);
    this.setTooltip('Enter the token to authenticate');
    this.setHelpUrl('https://www.binary.com/user/api_tokenws');
  }
};

Blockly.Blocks['binary_account'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["VRTC1197409", "X6PLvU3nx6JBaXo"], ["FakeToken", "faketokenishere12"]]), "account");
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
		this.setOutput(true, 'Account');
  }
};


Blockly.Blocks['binary_trade'] = {
  init: function() {
    this.appendDummyInput()
				.appendField('Markets: ')
				.appendField(new Blockly.FieldDropdown([["Random 100", "R_100"], ["Random 50", "R_50"], ["Bear", "RDBEAR"], ["Bull", "RDBULL"]]), "market");
		this.setPreviousStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
