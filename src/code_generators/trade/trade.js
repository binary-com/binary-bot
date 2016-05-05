var blockly = require('blockly');
var i18n = require('i18n');
blockly.JavaScript.trade = function (block) {
	var account = block.getFieldValue('ACCOUNT_LIST');
	var submarket = blockly.JavaScript.statementToCode(block, 'SUBMARKET');
	if (submarket === '') {
		throw {
			message: i18n._('You have to add a submarket first')
		};
	}
	// TODO: Assemble JavaScript into code variable.
	var code = 'var trade = function(trade_again){\nBot.trade.trade(\'' + account.trim() + '\', ' + submarket.trim() + ', trade_again);\n};\ntrade();\n';
	return code;
};
