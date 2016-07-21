'use strict';
var blockly = require('blockly');
var Translator = require('translator');
var translator = new Translator();
blockly.JavaScript.trade = function (block) {
	var account = $('#accountSelect').val();
	var submarket = blockly.JavaScript.statementToCode(block, 'SUBMARKET');
	if (submarket === '') {
		throw {
			message: translator.translateText('You have to add a submarket first')
		};
	}
	// TODO: Assemble JavaScript into code variable.
	var code = 'Bot.start(\'' + account.trim() + '\', ' + submarket.trim() + ', on_strategy, on_finish);\n';
	return code;
};
