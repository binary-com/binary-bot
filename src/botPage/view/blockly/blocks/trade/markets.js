// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zr2375
import { translator } from '../../../../../common/translator';
import { submarket } from '../../relationChecker';
import { bot } from '../../../../bot';
import { BlocklyError } from '../../../../../common/error';

export default () => {
  const symbolNames = bot.symbol.activeSymbols.getSymbolNames();
  for (const symbol of Object.keys(symbolNames)) {
    Blockly.Blocks[symbol.toLowerCase()] = {
      init: function init() {
        this.appendDummyInput()
          .appendField(symbolNames[symbol]);
        this.appendDummyInput()
          .appendField(`${translator.translateText('Accepts')}: (${
          bot.symbol.getAllowedCategoryNames(symbol)})`);
        this.appendStatementInput('CONDITION')
          .setCheck('Condition');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setColour('#f2f2f2');
        this.setTooltip(`${translator.translateText('Chooses the symbol:')} ${symbolNames[symbol]}`); // eslint-disable-line max-len
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
      },
      onchange: function onchange(ev) {
        submarket(this, ev);
      },
    };
  }

  for (const symbol of Object.keys(symbolNames)) {
    Blockly.JavaScript[symbol.toLowerCase()] = function market(block) {
      const condition = Blockly.JavaScript.statementToCode(block, 'CONDITION');
      if (!condition) {
        return new BlocklyError(
          translator.translateText('A trade type has to be defined for the symbol')).emit();
      }
      const code = `
      function getTradeOptions() {
        var tradeOptions = {};
        tradeOptions = ${condition.trim()};
        tradeOptions.symbol = '${symbol}'
        return tradeOptions;
      }
      `;
      return code;
    };
  }
};
