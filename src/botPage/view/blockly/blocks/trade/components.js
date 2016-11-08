import config from '../../../../../common/const'
import { translator } from '../../../../../common/translator'
import { bot } from '../../../../bot'

const oppositesToDropdown = (opposites) => opposites.map((k) => [k[Object.keys(k)[0]], Object.keys(k)[0]])

export const marketDropdown = (block) => {
  const markets = bot.symbol.activeSymbols.getMarkets()
  const getSubmarkets = () => {
    const marketName = block.getFieldValue('MARKET_LIST')
    const submarkets = markets[marketName].submarkets
    return Object.keys(submarkets).map(e => [submarkets[e].name, e])
  }
  const getSymbols = () => {
    const submarketName = block.getFieldValue('SUBMARKET_LIST')
    if (!submarketName) {
      return [['', '']]
    }
    const marketName = block.getFieldValue('MARKET_LIST')
    const submarkets = markets[marketName].submarkets
    const symbols = submarkets[submarketName].symbols
    return Object.keys(symbols)
      .map(e => [symbols[e].display, symbols[e].symbol])
  }
  block.appendDummyInput()
    .appendField(`${translator.translateText('Market')}:`)
    .appendField(new Blockly.FieldDropdown(Object.keys(markets).map(e => [markets[e].name, e])), 'MARKET_LIST')
    .appendField('->')
    .appendField(new Blockly.FieldDropdown(getSubmarkets), 'SUBMARKET_LIST')
    .appendField('->')
    .appendField(new Blockly.FieldDropdown(getSymbols), 'SYMBOL_LIST')
}

export const tradeTypeDropdown = (block) => {
  const getTradeTypeCats = () => {
    const symbol = block.getFieldValue('SYMBOL_LIST')
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
    const tradeTypeCat = block.getFieldValue('TRADETYPECAT_LIST')
    if (!tradeTypeCat) {
      return [['', '']]
    }
    return config.conditionsCategory[tradeTypeCat].map(e => [
      config.opposites[e.toUpperCase()].map(c => c[Object.keys(c)[0]])
      .join('/'),
    e,
    ])
  }
  block.appendDummyInput()
    .appendField(`${translator.translateText('Trade Type')}:`)
    .appendField(new Blockly.FieldDropdown(getTradeTypeCats), 'TRADETYPECAT_LIST')
    .appendField('->')
    .appendField(new Blockly.FieldDropdown(getTradeTypes), 'TRADETYPE_LIST')
}

export const contractTypes = (block, opposites) => {
  block.appendDummyInput('CONTRACT_TYPE')
    .appendField(translator.translateText('Contract Type:'))
    .appendField(new Blockly.FieldDropdown([
      [translator.translateText('Both'), 'both'],
      ...oppositesToDropdown(opposites),
    ]), 'TYPE_LIST')
}

export const candleInterval = (block) => {
  block.appendDummyInput('CANDLE_INTERVAL')
    .appendField(translator.translateText('Candle Interval:'))
    .appendField(new Blockly.FieldDropdown(config.candleIntervals), 'CANDLEINTERVAL_LIST')
}

export const duration = (block, oppositeNames) => {
  block.appendValueInput('DURATION')
    .setCheck('Number')
    .appendField(translator.translateText('Duration:'))
    .appendField(new Blockly.FieldDropdown(config.durationTypes[oppositeNames]), 'DURATIONTYPE_LIST')
}

export const payout = (block) => {
  block.appendValueInput('AMOUNT')
    .setCheck('Number')
    .appendField(translator.translateText('Payout:'))
    .appendField(new Blockly.FieldDropdown(config.lists.PAYOUTTYPE), 'PAYOUTTYPE_LIST')
  block.appendDummyInput('CURRENCY')
    .appendField(translator.translateText('Currency:'))
    .appendField(new Blockly.FieldDropdown(config.lists.CURRENCY), 'CURRENCY_LIST')
}

export const barrierOffset = (block, oppositeNames, name) => {
  let fieldName = translator.translateText('Barrier Offset:')
  if (name) {
    fieldName = name
  }
  block.appendValueInput('BARRIEROFFSET')
    .setCheck('BarrierOffset')
    .appendField(fieldName)
}

export const secondBarrierOffset = (block) => {
  block.appendValueInput('SECONDBARRIEROFFSET')
    .setCheck('BarrierOffset')
    .appendField(translator.translateText('Low Barrier Offset:'))
}

export const prediction = (block) => {
  block.appendValueInput('PREDICTION')
    .setCheck('Number')
    .appendField(translator.translateText('Prediction:'))
}
