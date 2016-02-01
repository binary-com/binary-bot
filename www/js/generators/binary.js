var authorize = function authorize(message){
	if ( message.authorize) {
		authenticated = true;
		CALLBACK
	} else {
		authenticated = false;
		alert('Failed to authenticate!', message);
	}   
};

Blockly.JavaScript['binary_main'] = function(block) {
  var statements_account = Blockly.JavaScript.statementToCode(block, 'account').trim();
  var statements_trade = Blockly.JavaScript.statementToCode(block, 'trade');
  var code = 'login("'+statements_account+'", '+authorize.toString().replace('CALLBACK', statements_trade)+');';
  return code;
};

Blockly.JavaScript['binary_account'] = function(block) {
  var dropdown_account = block.getFieldValue('account');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_account;
  return code;
};

Blockly.JavaScript['binary_trade'] = function(block) {
  var dropdown_market = block.getFieldValue('market');
  // TODO: Assemble JavaScript into code variable.
  var code = 'alert("market: " + "'+dropdown_market+'");';
  return code;
};
