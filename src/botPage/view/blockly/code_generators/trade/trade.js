import { translator } from '../../../../../common/translator';

Blockly.JavaScript.trade = function trade(block) {
  let account = $('#accountSelect').val();
  let submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
  if (submarket === '') {
    throw Error(translator.translateText('You have to add a submarket first'));
  }
  // TODO: Assemble JavaScript into code variable.
  let code = 'function trade(again){\nBot.start(\'' + account.trim() + '\', '
    + submarket.trim() + ', on_strategy, function(){}, on_finish, again);\n}';
  return code;
};
