import { findTopParentBlock } from '../../utils'
import { marketDropdown, tradeTypeDropdown, candleInterval, contractTypes } from './components'

export const getTradeType = block => {
  const tradeDefBlock = findTopParentBlock(block)
  return tradeDefBlock && tradeDefBlock.getFieldValue('TRADETYPE_LIST')
}

export const updateInputList = block => {
  const tradeType = getTradeType(block)
  if (tradeType) {
    Blockly.Blocks[tradeType].init.call(block)
  }
}

export const setInputList = block => {
  Blockly.Blocks.allFields.init.call(block)
}

export const moveMarketDefsToMainBlock = block => {
  const parent = findTopParentBlock(block)
  const extendParentFields = (field) => {
    const value = block.getFieldValue(field)
    if (!parent.getFieldValue(field) && value) {
      parent.setFieldValue(value, field)
    }
  }
  if (parent) {
    const recordUndo = Blockly.Events.recordUndo
    Blockly.Events.recordUndo = false
    Blockly.Events.setGroup('BackwardCompatibility')
    const fields = [
      'MARKET_LIST',
      'SUBMARKET_LIST',
      'SYMBOL_LIST',
      'TRADETYPECAT_LIST',
      'TRADETYPE_LIST',
      'TYPE_LIST',
      'CANDLEINTERVAL_LIST',
    ]

    // fields.forEach(f => extendParentFields(f))
    Blockly.Events.setGroup(false)
    Blockly.Events.recordUndo = recordUndo
  }
  block.removeInput('MARKETDEFINITION')
  block.removeInput('TRADETYPEDEFINITION')
  block.removeInput('CONTRACT_TYPE')
  block.removeInput('CANDLE_INTERVAL')
}

export const marketDefPlaceHolders = block => {
  marketDropdown(block)
  tradeTypeDropdown(block)
  contractTypes(block)
  candleInterval(block)
}
