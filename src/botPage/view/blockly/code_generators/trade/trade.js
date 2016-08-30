'use strict';

import { translator } from '../../../../../common/translator';

Blockly.JavaScript.trade = function (block) {
	var account = $('#accountSelect').val();
	var submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
	if (submarket === '') {
		throw {
			message: translator.translateText('You have to add a submarket first')
		};
	}
	// TODO: Assemble JavaScript into code variable.
	var code = 'function trade(again){\nBot.start(\'' + account.trim() + '\', ' + submarket.trim() + ', on_strategy, on_finish, again);\n}';
	return code;
};
