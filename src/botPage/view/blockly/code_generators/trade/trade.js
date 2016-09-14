import { translator } from '../../../../../common/translator';

Blockly.JavaScript.trade = function trade(block) {
  const account = $('#accountSelect').val();
  if (!account) {
    throw Error(translator.translateText('Please login.'));
  }
  const submarket = Blockly.JavaScript.statementToCode(block, 'SUBMARKET');
  if (submarket === '') {
    throw Error(translator.translateText('You have to add a submarket first'));
  }
  // TODO: Assemble JavaScript into code variable.
  const code = 'function trade(again){\nBot.start(\'' + account.trim() + '\', '
    + submarket.trim() + ', on_strategy, typeof during_purchase === \'undefined\' ? function(){} : during_purchase, on_finish, again);\n}';
  return code;
};
