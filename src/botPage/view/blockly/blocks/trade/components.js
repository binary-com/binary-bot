import config from '../../../../../common/const'
import { translator } from '../../../../../common/translator'
import { bot } from '../../../../bot'
import { oppositesToDropdown } from '../../utils'

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

export const restartOnError = (block) => {
  block.appendDummyInput()
    .appendField(`${translator.translateText('Restart On Error (Use with caution)')}:`)
    .appendField(new Blockly.FieldImage('https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Caution_sign_used_on_roads_pn.svg/512px-Caution_sign_used_on_roads_pn.svg.png', 15, 15, translator.translateText('Caution!')))
    .appendField(new Blockly.FieldCheckbox('FALSE'), 'RESTARTONERROR')
}

export const contractTypes = (block) => {
  if (!block.getInput('CONTRACT_TYPE')) {
    const getContractTypes = () => {
      const tradeType = block.getFieldValue('TRADETYPE_LIST')
      if (tradeType) {
        return [
          [translator.translateText('Both'), 'both'],
          ...oppositesToDropdown(config.opposites[tradeType.toUpperCase()]),
        ]
      }
      return [['', '']]
    }
    block.appendDummyInput('CONTRACT_TYPE')
      .appendField(translator.translateText('Contract Type:'))
      .appendField(new Blockly.FieldDropdown(getContractTypes), 'TYPE_LIST')
  }
}

export const candleInterval = (block) => {
  if (!block.getInput('CANDLE_INTERVAL')) {
    block.appendDummyInput('CANDLE_INTERVAL')
      .appendField(translator.translateText('Candle Interval:'))
      .appendField(new Blockly.FieldDropdown(config.candleIntervals), 'CANDLEINTERVAL_LIST')
  }
}

export const duration = (block) => {
  if (!block.getInput('DURATION')) {
    const getDurationTypes = () => {
      const tradeType = block.getFieldValue('TRADETYPE_LIST')
      if (tradeType) {
        return config.durationTypes[tradeType.toUpperCase()]
      }
      return [['', '']]
    }
    block.appendValueInput('DURATION')
      .setCheck('Number')
      .appendField(translator.translateText('Duration:'))
      .appendField(new Blockly.FieldDropdown(getDurationTypes), 'DURATIONTYPE_LIST')
  }
}

export const payout = (block) => {
  if (!block.getInput('AMOUNT')) {
    block.appendValueInput('AMOUNT')
      .setCheck('Number')
      .appendField(translator.translateText('Payout:'))
      .appendField(new Blockly.FieldDropdown(config.lists.PAYOUTTYPE), 'PAYOUTTYPE_LIST')
      .appendField(translator.translateText('Currency:'))
      .appendField(new Blockly.FieldDropdown(config.lists.CURRENCY), 'CURRENCY_LIST')
  }
}

export const barrierOffset = (block) => {
  if (!block.getInput('BARRIEROFFSET')) {
    block.appendValueInput('BARRIEROFFSET')
      .setCheck('Number')
      .appendField(`${translator.translateText('Barrier Offset')} 1:`)
      .appendField(new Blockly.FieldDropdown(config.barrierTypes), 'BARRIEROFFSETTYPE_LIST')
  }
}

export const secondBarrierOffset = (block) => {
  if (!block.getInput('SECONDBARRIEROFFSET')) {
    block.appendValueInput('SECONDBARRIEROFFSET')
      .setCheck('Number')
      .appendField(`${translator.translateText('Barrier Offset')} 2:`)
      .appendField(new Blockly.FieldDropdown(config.barrierTypes), 'SECONDBARRIEROFFSETTYPE_LIST')
  }
}

export const prediction = (block) => {
  if (!block.getInput('PREDICTION')) {
    block.appendValueInput('PREDICTION')
      .setCheck('Number')
      .appendField(translator.translateText('Prediction:'))
  }
}
