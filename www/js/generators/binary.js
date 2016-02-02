(function(){
	var authorize = function authorize(message){
		if ( message.authorize) {
			CALLBACK
		} else {
			alert('Failed to authenticate!', message);
		}   
	};

	Blockly.JavaScript['binary_main'] = function binary_main(block) {
		var value_account = eval(Blockly.JavaScript.valueToCode(block, 'ACCOUNT', Blockly.JavaScript.ORDER_ATOMIC));
		var statements_trade = Blockly.JavaScript.statementToCode(block, 'TRADE');
		var code = 'binary_visual.login("'+value_account+'", '+authorize.toString().replace('CALLBACK', statements_trade)+');';
		return code;
	};

	var chooseByIndex = function chooseByIndex(caps_name, index){
		var index = parseInt();
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
		var index = eval(Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC));
		var item = chooseByIndex(caps_name, index);
		var dropdown_account = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_account;
		code = (item === null)? code: item;
		code = '\'' + code + '\'';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['binary_market'] = function binary_market(block) {
		var caps_name = 'MARKET';
		var index = eval(Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC));
		var item = chooseByIndex(caps_name, index);
		var dropdown_market = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_market;
		code = (item === null)? code: item;
		code = '\'' + code + '\'';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};


	Blockly.JavaScript['binary_underlying'] = function binary_underlying(block) {
		var caps_name = 'UNDERLYING';
		var index = eval(Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC));
		var item = chooseByIndex(caps_name, index);
		var dropdown_underlying = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_underlying;
		code = (item === null)? code: item;
		code = '\'' + code + '\'';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['binary_trade_type_updown'] = function binary_trade_type_updown(block) {
		var caps_name = 'TRADETYPEUPDOWN';
		var index = eval(Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC));
		var item = chooseByIndex(caps_name, index);
		var dropdown_trade_type_updown = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_trade_type_updown;
		code = (item === null)? code: item;
		code = '\'' + code + '\'';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['binary_trade_type_match'] = function binary_trade_type_match(block) {
		var caps_name = 'TRADETYPEMATCH';
		var index = eval(Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC));
		var item = chooseByIndex(caps_name, index);
		var dropdown_trade_type_match = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_trade_type_match;
		code = (item === null)? code: item;
		code = '\'' + code + '\'';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['binary_trade_type_oddness'] = function binary_trade_type_oddness(block) {
		var caps_name = 'TRADETYPEODDNESS';
		var index = eval(Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC));
		var item = chooseByIndex(caps_name, index);
		var dropdown_trade_type_oddness = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_trade_type_oddness;
		code = (item === null)? code: item;
		code = '\'' + code + '\'';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['binary_trade_type_underover'] = function binary_trade_type_underover(block) {
		var caps_name = 'TRADETYPEUNDEROVER';
		var index = eval(Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC));
		var item = chooseByIndex(caps_name, index);
		var dropdown_trade_type_underover = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_trade_type_underover;
		code = (item === null)? code: item;
		code = '\'' + code + '\'';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['binary_payout_type'] = function binary_payout_type(block) {
		var caps_name = 'PAYOUTTYPE';
		var index = eval(Blockly.JavaScript.valueToCode(block, caps_name + 'IN', Blockly.JavaScript.ORDER_ATOMIC));
		var item = chooseByIndex(caps_name, index);
		var dropdown_payout_type = block.getFieldValue(caps_name);
		// TODO: Assemble JavaScript into code variable.
		var code = dropdown_payout_type;
		code = (item === null)? code: item;
		code = '\'' + code + '\'';
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript['binary_trade'] = function binary_trade(block) {
		var value_market = Blockly.JavaScript.valueToCode(block, 'MARKET', Blockly.JavaScript.ORDER_ATOMIC);
		var value_underlying = Blockly.JavaScript.valueToCode(block, 'UNDERLYING', Blockly.JavaScript.ORDER_ATOMIC);
		var value_trade_type = Blockly.JavaScript.valueToCode(block, 'TRADETYPE', Blockly.JavaScript.ORDER_ATOMIC);
		var value_ticks_count = Blockly.JavaScript.valueToCode(block, 'TICKSCOUNT', Blockly.JavaScript.ORDER_ATOMIC);
		var value_payout_type = Blockly.JavaScript.valueToCode(block, 'PAYOUTTYPE', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'console.log('+value_market+', '+value_underlying+', '+value_trade_type+', '+value_ticks_count+', '+value_payout_type+');';
		return code;
	};
})();
