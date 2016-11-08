// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#db8gmg
import { translator } from '../../../../../common/translator'
import config from '../../../../../common/const'
import { bot } from '../../../../bot'

const inputList = ['CONTRACT_TYPE',
  'CANDLE_INTERVAL',
  'DURATION',
  'AMOUNT',
  'CURRENCY',
  'BARRIEROFFSET',
  'SECONDBARRIEROFFSET',
  'PREDICTION']
const updateInputList = (block) => {
  inputList.map(e => block.removeInput(e))
  Blockly.Blocks[block.getFieldValue('TRADETYPE_LIST')].init.call(block)
}
export default () => {
  Blockly.Blocks.market = {
    init: function init() {
      const markets = bot.symbol.activeSymbols.getMarkets()
      const getSubmarkets = () => {
        const marketName = this.getFieldValue('MARKET_LIST')
        const submarkets = markets[marketName].submarkets
        return Object.keys(submarkets).map(e => [submarkets[e].name, e])
      }
      const getSymbols = () => {
        const submarketName = this.getFieldValue('SUBMARKET_LIST')
        if (!submarketName) {
          return [['', '']]
        }
        const marketName = this.getFieldValue('MARKET_LIST')
        const submarkets = markets[marketName].submarkets
        const symbols = submarkets[submarketName].symbols
        return Object.keys(symbols).map(e => [symbols[e].display, e])
      }
      this.appendDummyInput()
        .appendField(`${translator.translateText('Market')}:`)
        .appendField(new Blockly.FieldDropdown(Object.keys(markets).map(e => [markets[e].name, e])), 'MARKET_LIST')
        .appendField('->')
        .appendField(new Blockly.FieldDropdown(getSubmarkets), 'SUBMARKET_LIST')
        .appendField('->')
        .appendField(new Blockly.FieldDropdown(getSymbols), 'SYMBOL_LIST')
      const getTradeTypeCats = () => {
        const symbol = this.getFieldValue('SYMBOL_LIST')
        if (!symbol) {
          return [['', '']]
        }
        const allowedCategories = bot.symbol.getAllowedCategories(symbol)
        return Object.keys(config.conditionsCategoryName)
          .filter(e => allowedCategories.indexOf(e) >= 0)
          .map(e => [config.conditionsCategoryName[e], e])
      }
      const getTradeTypes = () => {
        const tradeTypeCat = this.getFieldValue('TRADETYPECAT_LIST')
        if (!tradeTypeCat) {
          return [['', '']]
        }
        return config.conditionsCategory[tradeTypeCat].map(e => [
          config.opposites[e.toUpperCase()].map(c => c[Object.keys(c)[0]])
          .join('/'),
          e,
        ])
      }
      this.appendDummyInput()
        .appendField(`${translator.translateText('Trade Type')}:`)
        .appendField(new Blockly.FieldDropdown(getTradeTypeCats), 'TRADETYPECAT_LIST')
        .appendField('->')
        .appendField(new Blockly.FieldDropdown(getTradeTypes), 'TRADETYPE_LIST')
      if (this.getFieldValue('TRADETYPE_LIST')) {
        updateInputList(this)
      }
      console.log(this)
      this.setPreviousStatement(true, 'Market')
      this.setColour('#f2f2f2')
    },
    onchange: function onchange(ev) {
      if (ev.blockId === this.id && ev.element === 'field') {
        if (ev.name === 'MARKET_LIST') {
          this.setFieldValue('', 'SUBMARKET_LIST')
          this.setFieldValue('', 'SYMBOL_LIST')
          this.setFieldValue('', 'TRADETYPE_LIST')
          this.setFieldValue('', 'TRADETYPECAT_LIST')
        }
        if (ev.name === 'SUBMARKET_LIST') {
          this.setFieldValue('', 'SYMBOL_LIST')
          this.setFieldValue('', 'TRADETYPE_LIST')
          this.setFieldValue('', 'TRADETYPECAT_LIST')
        }
        if (ev.name === 'TRADETYPECAT_LIST') {
          this.setFieldValue('', 'TRADETYPE_LIST')
        }
        if (ev.name === 'TRADETYPE_LIST') {
          if (ev.newValue) {
            updateInputList(this)
          }
        }
      }
    },
  }
  Blockly.JavaScript.market = () => {
  }
  /*
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
*/
}
