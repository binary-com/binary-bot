import { findTopParentBlock } from '../../utils'
import { marketDropdown, tradeTypeDropdown, candleInterval, contractTypes, setInitialized } from './components'

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

const marketFields = [
  'MARKET_LIST',
  'SUBMARKET_LIST',
  'SYMBOL_LIST',
  'TRADETYPECAT_LIST',
  'TRADETYPE_LIST',
  'TYPE_LIST',
  'CANDLEINTERVAL_LIST',
]

export const setMarketFieldsFromMarketDef = block => {
  const children = block.getChildren()
  if (children.length && children[0].type === 'market') {
    const market = children[0]
    if (market.getFieldValue('MARKET_LIST') === 'Invalid') {
      marketFields.forEach(field => {
        const value = block.getFieldValue(field)
        const currentValue = market.getFieldValue(field)
        if (currentValue && value) {
          market.setFieldValue(value, field)
        }
      })
    }
    setInitialized()
  }
}

export const moveMarketDefsToMainBlock = block => {
  const parent = findTopParentBlock(block)
  const extendParentFields = (field) => {
    const value = block.getFieldValue(field)
    if (value) {
      parent.setFieldValue(value, field)
    }
  }
  if (parent) {
    const recordUndo = Blockly.Events.recordUndo
    Blockly.Events.recordUndo = false
    Blockly.Events.setGroup('BackwardCompatibility')
    marketFields.forEach(f => extendParentFields(f))
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
