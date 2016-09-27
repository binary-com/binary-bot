// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u7tjez
import { translator } from '../../../../../common/translator';

Blockly.Blocks.on_strategy = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(2) things to do before purchase is made'));
    this.appendStatementInput('STRATEGY_STACK')
      .setCheck('Purchase');
    this.setColour('#2a3052');
    this.setTooltip(translator.translateText('This block decides what to do each time a new tick is received')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
Blockly.JavaScript.on_strategy = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
	const code = `function on_strategy(ticks, proposals, purchaseCtrl){
	if(purchaseCtrl === null) return; 
	${stack}
	}
	`;
  return code;
};
