import { bot } from '../../../../bot';

export default () => {
  let symbolNames = bot.symbol.activeSymbols.getSymbolNames();
	for (let symbol of Object.keys(symbolNames)) {
    Blockly.JavaScript[symbol.toLowerCase()] = function(block) {
      if (this.parentBlock_ === null) {
        return '';
      }
      let condition = Blockly.JavaScript.statementToCode(block, 'CONDITION');
      if (!condition) {
        throw {
          message: 'A trade type has to be defined for the symbol',
        };
      }
      let code = condition.trim() + '\n symbol: \'' + symbol + '\'}';
      return code;
    };
  }
};
