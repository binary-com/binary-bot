// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zr2375
import { translator } from '../../../../../common/translator'
import { submarket } from '../../relationChecker'
import { bot } from '../../../../bot'
import { BlocklyError } from '../../../../../common/error'

export default () => {
  const symbols = bot.symbol.activeSymbols.getSymbols()
  for (const k of Object.keys(symbols)) {
    const allowedCategories = bot.symbol.getAllowedCategoryNames(k)
    if (allowedCategories.length) {
      Blockly.Blocks[k] = {
        init: function init() {
          this.appendDummyInput()
            .appendField(symbols[k].display)
          this.appendDummyInput()
            .appendField(`${translator.translateText('Accepts')}: (${allowedCategories})`)
          this.appendStatementInput('CONDITION')
            .setCheck('Condition')
          this.setInputsInline(false)
          this.setPreviousStatement(true, null)
          this.setColour('#f2f2f2')
          this.setTooltip(`${translator.translateText('Chooses the symbol:')} ${symbols[k].display}`); // eslint-disable-line max-len
          this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki')
        },
        onchange: function onchange(ev) {
          submarket(this, ev)
        },
      }
      Blockly.JavaScript[k] = function market(block) {
        const condition = Blockly.JavaScript.statementToCode(block, 'CONDITION')
        if (!condition) {
          return new BlocklyError(
            translator.translateText('A trade type has to be defined for the symbol')).emit()
        }
        const code = `
      getTradeOptions = function getTradeOptions() {
        var tradeOptions = {}
        tradeOptions = ${condition.trim()}
        tradeOptions.symbol = '${symbols[k].symbol}'
        return tradeOptions
      }
      `
        return code
      }
    }
  }
}
