import { bot } from '../../../../bot';
import { translator } from '../../../../../common/translator';

export default () => {
  const symbolNames = bot.symbol.activeSymbols.getSymbolNames();
	for (const symbol of Object.keys(symbolNames)) {
    Blockly.JavaScript[symbol.toLowerCase()] = function market(block) {
      if (this.parentBlock_ === null) { // eslint-disable-line no-underscore-dangle
        return '';
      }
      const condition = Blockly.JavaScript.statementToCode(block, 'CONDITION');
      if (!condition) {
        throw Error(translator.translateText('A trade type has to be defined for the symbol'));
      }
      const code = condition.trim() + '\n symbol: \'' + symbol + '\'}';
      return code;
    };
  }
};
