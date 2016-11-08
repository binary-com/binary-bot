// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#db8gmg
import { translator } from '../../../../../common/translator'
import config from '../../../../../common/const'
import { bot } from '../../../../bot'
import { BlocklyError } from '../../../../../common/error'

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
        return Object.keys(symbols)
          .map(e => [symbols[e].display, symbols[e].symbol])
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
        const allowedCategories = bot.symbol
          .getAllowedCategories(symbol.toLowerCase())
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
  Blockly.JavaScript.market = (block) => {
    const durationValue = Blockly.JavaScript.valueToCode(block,
      'DURATION', Blockly.JavaScript.ORDER_ATOMIC)
    const candleIntervalValue = block.getFieldValue('CANDLEINTERVAL_LIST')
    const contractTypeSelector = block.getFieldValue('TYPE_LIST')
    const durationType = block.getFieldValue('DURATIONTYPE_LIST')
    const payouttype = block.getFieldValue('PAYOUTTYPE_LIST')
    const currency = block.getFieldValue('CURRENCY_LIST')
    const amount = Blockly.JavaScript.valueToCode(block,
      'AMOUNT', Blockly.JavaScript.ORDER_ATOMIC)
    let predictionValue
    let barrierOffsetValue
    let secondBarrierOffsetValue
    const oppositesName = block.getFieldValue('TRADETYPE_LIST').toUpperCase()
    if (config.hasPrediction.indexOf(oppositesName) > -1) {
      predictionValue = Blockly.JavaScript.valueToCode(block,
        'PREDICTION', Blockly.JavaScript.ORDER_ATOMIC)
      if (predictionValue === '') {
        return new BlocklyError(translator.translateText('All trade types are required')).emit()
      }
    }
    if (config.hasBarrierOffset.indexOf(oppositesName) > -1 ||
      config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
      barrierOffsetValue = Blockly.JavaScript.valueToCode(block,
        'BARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC)
      if (barrierOffsetValue === '') {
        return new BlocklyError(translator.translateText('All trade types are required')).emit()
      }
    }
    if (config.hasSecondBarrierOffset.indexOf(oppositesName) > -1) {
      secondBarrierOffsetValue = Blockly.JavaScript.valueToCode(block,
        'SECONDBARRIEROFFSET', Blockly.JavaScript.ORDER_ATOMIC)
      if (secondBarrierOffsetValue === '') {
        return new BlocklyError(translator.translateText('All trade types are required')).emit()
      }
    }
    if (oppositesName === '' || durationValue === '' ||
      payouttype === '' || currency === '' || amount === '') {
      return new BlocklyError(translator.translateText('All trade types are required')).emit()
    }
    const contractTypeList = contractTypeSelector === 'both' ?
      config.opposites[oppositesName].map((k) => Object.keys(k)[0]) :
      [contractTypeSelector]
    const code = `
      getTradeOptions = function getTradeOptions() {
        var tradeOptions = {}
        tradeOptions = {
          contractTypes: '${JSON.stringify(contractTypeList)}',
          candleInterval: '${candleIntervalValue}',
          duration: ${durationValue},
          duration_unit: '${durationType}',
          basis: '${payouttype}',
          currency: '${currency}',
          amount: ${amount},
          ${((config.hasPrediction.indexOf(oppositesName) > -1 && predictionValue !== '')
      ? `prediction: ${predictionValue},` : '')}
          ${((config.hasSecondBarrierOffset.indexOf(oppositesName) > -1
    || (config.hasBarrierOffset.indexOf(oppositesName) > -1 && barrierOffsetValue !== ''))
      ? `barrierOffset: ${barrierOffsetValue},` : '')}
          ${((config.hasSecondBarrierOffset.indexOf(oppositesName) > -1 && secondBarrierOffsetValue !== '')
      ? `secondBarrierOffset: ${secondBarrierOffsetValue},` : '')}
        }
        tradeOptions.symbol = '${block.getFieldValue('SYMBOL_LIST')}'
        return tradeOptions
      }
      `
    return code
  }
}
