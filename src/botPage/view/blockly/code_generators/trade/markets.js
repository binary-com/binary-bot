'use strict';

import { bot } from '../../../../bot';

module.exports = function init() {
  var symbolNames = bot.symbol.activeSymbols.getSymbolNames();
  Object.keys(symbolNames).forEach(function(symbol) {
    Blockly.JavaScript[symbol.toLowerCase()] = function(block) {
      if (this.parentBlock_ === null) {
        return '';
      }
      var condition = Blockly.JavaScript.statementToCode(block, 'CONDITION');
      if (!condition) {
        throw {
          message: 'A trade type has to be defined for the symbol'
        };
      }
      var code = condition.trim() + '\n symbol: \'' + symbol + '\'}'; // opened by the condition block;
      return code;
    };
  });
};
