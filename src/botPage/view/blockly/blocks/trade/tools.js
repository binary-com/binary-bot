import { findTopParentBlock } from '../../utils'

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

