// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#s2hdag
Blockly.Blocks['updown'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("Up/Down");
		this.appendValueInput("DURATION")
			.setCheck("Number")
			.appendField("Duration:");
		this.appendValueInput("DURATIONUNIT")
			.setCheck("DurationUnit")
			.appendField("Duration Unit:");
		this.appendValueInput("PAYOUTTYPE")
			.setCheck("PayoutType")
			.appendField("Payout Type:");
		this.appendValueInput("CURRENCY")
			.setCheck("Currency")
			.appendField("Currency:");
		this.appendValueInput("AMOUNT")
			.setCheck("Number")
			.appendField("Amount:");
		this.setInputsInline(false);
		this.setPreviousStatement(true, "Condition");
		this.setColour(15);
	}
};
