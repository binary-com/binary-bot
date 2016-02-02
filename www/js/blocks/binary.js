(function(){
	var help_url = 'https://www.binary.com/user/api_tokenws';
	Blockly.Blocks['binary_main'] = {
		init: function() {
			this.setPreviousStatement(true);
			this.appendDummyInput()
					.appendField('Binary');
			this.appendValueInput('ACCOUNT')
					.setCheck("Account")
					.appendField('Account: ');
			this.appendStatementInput("TRADE")
					.appendField('Trade: ');
			this.setColour(330);
			this.setTooltip('Enter the token to authenticate');
			this.setHelpUrl(help_url);
		}
	};

	Blockly.Blocks['binary_account'] = {
		init: function() {
			this.appendValueInput("ACCOUNTIN");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown(binary_visual.config.options['ACCOUNT']), "ACCOUNT");
			this.setColour(40);
			this.setTooltip('');
			this.setHelpUrl(help_url);
			this.setOutput(true, 'Account');
		}
	};


	Blockly.Blocks['binary_market'] = {
		init: function() {
			this.appendValueInput("MARKETIN");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown(binary_visual.config.options['MARKET']), "MARKET");
			this.setColour(140);
			this.setTooltip('');
			this.setHelpUrl(help_url);
			this.setOutput(true, 'Market');
		}
	};

	Blockly.Blocks['binary_underlying'] = {
		init: function() {
			this.appendValueInput("UNDERLYINGIN");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown(binary_visual.config.options['UNDERLYING']), "UNDERLYING");
			this.setColour(140);
			this.setTooltip('');
			this.setHelpUrl(help_url);
			this.setOutput(true, 'Underlying');
		}
	};

	Blockly.Blocks['binary_trade_type_updown'] = {
		init: function() {
			this.appendValueInput("TRADETYPEUPDOWNIN");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown(binary_visual.config.options['TRADETYPEUPDOWN']), "TRADETYPEUPDOWN");
			this.setOutput(true);
			this.setColour(20);
			this.setTooltip('');
			this.setHelpUrl(help_url);
			this.setOutput(true, 'TradeTypeUpdown');
		}
	};

	Blockly.Blocks['binary_trade_type_match'] = {
		init: function() {
			this.appendValueInput("TRADETYPEMATCHIN");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown(binary_visual.config.options['TRADETYPEMATCH']), "TRADETYPEMATCH");
			this.appendValueInput("DIGIT")
					.setCheck("Number")
					.appendField("Digit:");
			this.setOutput(true);
			this.setColour(20);
			this.setTooltip('');
			this.setHelpUrl(help_url);
			this.setOutput(true, 'TradeTypeMatch');
		}
	};

	Blockly.Blocks['binary_trade_type_oddness'] = {
		init: function() {
			this.appendValueInput("TRADETYPEODDNESSIN");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown(binary_visual.config.options['TRADETYPEODDNESS']), "TRADETYPEODDNESS");
			this.setOutput(true);
			this.setColour(20);
			this.setTooltip('');
			this.setHelpUrl(help_url);
			this.setOutput(true, 'TradeTypeOdness');
		}
	};

	Blockly.Blocks['binary_trade_type_underover'] = {
		init: function() {
			this.appendValueInput("TRADETYPEUNDEROVERIN");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown(binary_visual.config.options['TRADETYPEUNDEROVER']), "TRADETYPEUNDEROVER");
			this.appendValueInput("DIGIT")
					.setCheck("Number")
					.appendField("Digit:");
			this.setOutput(true);
			this.setColour(20);
			this.setTooltip('');
			this.setHelpUrl(help_url);
			this.setOutput(true, 'TradeTypeUnderover');
		}
	};

	Blockly.Blocks['binary_payout_type'] = {
		init: function() {
			this.appendValueInput("PAYOUTTYPEIN");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown(binary_visual.config.options['PAYOUTTYPE']), "PAYOUTTYPE");
			this.setColour(140);
			this.setTooltip('');
			this.setHelpUrl(help_url);
			this.setOutput(true, 'PayoutType');
		}
	};

	Blockly.Blocks['binary_trade'] = {
		init: function() {
			this.appendValueInput("MARKET")
					.setCheck("Market")
					.appendField("Market:");
			this.appendValueInput("UNDERLYING")
					.setCheck("Underlying")
					.appendField("Underlying:");
			this.appendValueInput("TRADETYPE")
					.setCheck(["TradeTypeUpdown", "TradeTypeMatch", "TradeTypeOdness", "TradeTypeUnderover"])
					.appendField('Trade Type: ');
			this.appendValueInput("TICKSCOUNT")
					.setCheck("Number")
					.appendField('Ticks Count: ');
			this.appendValueInput("PAYOUTTYPE")
					.setCheck("PayoutType")
					.appendField('Payout Type: ');
			this.setPreviousStatement(true);
			this.setColour(65);
			this.setTooltip('');
			this.setHelpUrl(help_url);
		}
	};
})();
