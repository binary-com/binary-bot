(function(){
	var authorize = function authorize(message){
		if ( message.authorize) {
			authenticated = true;
			CALLBACK
		} else {
			authenticated = false;
			alert('Failed to authenticate!', message);
		}   
	};

	Blockly.JavaScript['binary_main'] = function binary_main(block) {
		var statements_account = Blockly.JavaScript.statementToCode(block, 'ACCOUNT').trim();
		var statements_trade = Blockly.JavaScript.statementToCode(block, 'TRADE');
		var code = 'binary_visual.login("'+statements_account+'", '+authorize.toString().replace('CALLBACK', statements_trade)+');';
		return code;
	};

	var chooseByIndex = function chooseByIndex(caps_name, index){
		var index = parseInt(eval(index));
		if ( isNaN(index) ){
			return null;
		}
		if ( index > 0 && index <= binary_visual.config.options[caps_name].length ) {
			index--;
			return binary_visual.config.options[caps_name][index][1];
		} else {
			return null;
		}
	};

	Blockly.JavaScript['binary_account'] = function binary_account(block) {
		var caps_name = 'ACCOUNT';
		var index = Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC);
		var item = chooseByIndex(caps_name, index);
		var dropdown_account = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_account;
		return (item === null)? code: item;
	};

	Blockly.JavaScript['binary_market'] = function binary_market(block) {
		var caps_name = 'MARKET';
		var index = Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC);
		var item = chooseByIndex(caps_name, index);
		var dropdown_market = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_market;
		return (item === null)? code: item;
	};


	Blockly.JavaScript['binary_underlying'] = function binary_underlying(block) {
		var caps_name = 'UNDERLYING';
		var index = Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC);
		var item = chooseByIndex(caps_name, index);
		var dropdown_underlying = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_underlying;
		return (item === null)? code: item;
	};

	Blockly.JavaScript['binary_trade_type_updown'] = function binary_trade_type_updown(block) {
		var caps_name = 'TRADETYPEUPDOWN';
		var index = Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC);
		var item = chooseByIndex(caps_name, index);
		var dropdown_trade_type_updown = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_trade_type_updown;
		return (item === null)? code: item;
	};

	Blockly.JavaScript['binary_trade_type_match'] = function binary_trade_type_match(block) {
		var caps_name = 'TRADETYPEMATCH';
		var index = Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC);
		var item = chooseByIndex(caps_name, index);
		var dropdown_trade_type_match = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_trade_type_match;
		return (item === null)? code: item;
	};

	Blockly.JavaScript['binary_trade_type_oddness'] = function binary_trade_type_oddness(block) {
		var caps_name = 'TRADETYPEODDNESS';
		var index = Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC);
		var item = chooseByIndex(caps_name, index);
		var dropdown_trade_type_oddness = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_trade_type_oddness;
		return (item === null)? code: item;
	};

	Blockly.JavaScript['binary_trade_type_underover'] = function binary_trade_type_underover(block) {
		var caps_name = 'TRADETYPEUNDEROVER';
		var index = Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC);
		var item = chooseByIndex(caps_name, index);
		var dropdown_trade_type_underover = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_trade_type_underover;
		return (item === null)? code: item;
	};

	Blockly.JavaScript['binary_payout_type'] = function binary_payout_type(block) {
		var caps_name = 'PAYOUTTYPE';
		var index = Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC);
		var item = chooseByIndex(caps_name, index);
		var dropdown_payout_type = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_payout_type;
		return (item === null)? code: item;
	};

	Blockly.JavaScript['binary_trade'] = function binary_trade(block) {
		var statements_market = Blockly.JavaScript.statementToCode(block, 'MARKET').trim();
		var statements_underlying = Blockly.JavaScript.statementToCode(block, 'UNDERLYING').trim();
		var statements_trade_type = Blockly.JavaScript.statementToCode(block, 'TRADETYPE').trim();
		var value_ticks_count = Blockly.JavaScript.valueToCode(block, 'TICKSCOUNT', Blockly.JavaScript.ORDER_ATOMIC);
		var statements_payout_type = Blockly.JavaScript.statementToCode(block, 'PAYOUTTYPE').trim();
		// TODO: Assemble JavaScript into code variable.
		var code = 'console.log("'+statements_market+'", "'+statements_underlying+'", "'+statements_trade_type+'", "'+value_ticks_count+'", "'+statements_payout_type+'")';
		return code;
	};
})();
