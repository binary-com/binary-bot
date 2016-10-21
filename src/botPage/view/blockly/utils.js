import fileSaver from 'filesaverjs'
import { observer } from 'binary-common-utils/lib/observer'
import config from '../../../common/const'
import { translator } from '../../../common/translator'

const purchaseChoices = [[translator.translateText('Click to select'), '']]

export const deleteBlockIfExists = (block) => {
  Blockly.Events.recordUndo = false
  for (const mainBlock of Blockly.mainWorkspace.getTopBlocks()) {
    if (!block.isInFlyout && mainBlock.id !== block.id && mainBlock.type === block.type) {
      block.dispose()
      return true
    }
  }
  Blockly.Events.recordUndo = true
  return false
}

export const setBlockTextColor = (block) => {
  Blockly.Events.recordUndo = false
  const field = block.getField()
  if (field) {
    const svgElement = field.getSvgRoot()
    if (svgElement) {
      svgElement.style.setProperty('fill', 'white', 'important')
    }
  }
  Blockly.Events.recordUndo = true
}

export const configMainBlock = (ev, type) => {
  if (ev.type === 'create') {
    for (const blockId of ev.ids) {
      const block = Blockly.mainWorkspace.getBlockById(blockId)
      if (block) {
        if (block.type === type) {
          deleteBlockIfExists(block)
        }
      }
    }
  }
}

export const isMainBlock = (blockType) => config.mainBlocks.indexOf(blockType) >= 0

export const getBlockByType = (type) => {
  for (const block of Blockly.mainWorkspace.getAllBlocks()) {
    if (type === block.type) {
      return block
    }
  }
  return null
}

export const getMainBlocks = () => {
  const result = []
  for (const blockType of config.mainBlocks) {
    const block = getBlockByType(blockType)
    if (block) {
      result.push(block)
    }
  }
  return result
}

export const getBlocksByType = (type) => {
  const result = []
  for (const block of Blockly.mainWorkspace.getAllBlocks()) {
    if (type === block.type) {
      result.push(block)
    }
  }
  return result
}

export const getPurchaseChoices = () => purchaseChoices

export const findTopParentBlock = (b) => {
  let block = b
  let pblock = block.parentBlock_
  if (pblock === null) {
    return null
  }
  while (pblock !== null) {
    if (pblock.type === 'trade') {
      return pblock
    }
    block = pblock
    pblock = block.parentBlock_
  }
  return block
}

export const addPurchaseOptions = (submarket) => {
  let firstOption = {}
  let secondOption = {}
  if (submarket && submarket.getInputTargetBlock('CONDITION') !== null) {
    const conditionType = submarket.getInputTargetBlock('CONDITION').type
    const opposites = config.opposites[conditionType.toUpperCase()]
    purchaseChoices.length = 0
    opposites.forEach((option, index) => {
      if (index === 0) {
        firstOption = {
          condition: Object.keys(option)[0],
          name: option[Object.keys(option)[0]],
        }
      } else {
        secondOption = {
          condition: Object.keys(option)[0],
          name: option[Object.keys(option)[0]],
        }
      }
      purchaseChoices.push([option[Object.keys(option)[0]], Object.keys(option)[0]])
    })
    const purchases = Blockly.mainWorkspace.getAllBlocks()
      .filter((r) => (['purchase', 'payout', 'ask_price'].indexOf(r.type) >= 0))
    Blockly.Events.recordUndo = false
    for (const purchase of purchases) {
      const value = purchase.getField('PURCHASE_LIST')
        .getValue()
      Blockly.WidgetDiv.hideIfOwner(purchase.getField('PURCHASE_LIST'))
      if (value === firstOption.condition) {
        purchase.getField('PURCHASE_LIST')
          .setText(firstOption.name)
      } else if (value === secondOption.condition) {
        purchase.getField('PURCHASE_LIST')
          .setText(secondOption.name)
      } else {
        purchase.getField('PURCHASE_LIST')
          .setValue(firstOption.condition)
        purchase.getField('PURCHASE_LIST')
          .setText(firstOption.name)
      }
    }
    Blockly.Events.recordUndo = true
  }
}

export const save = (filename = 'binary-bot', collection = false, xmlDom) => {
  xmlDom.setAttribute('collection', collection ? 'true' : 'false')
  const xmlText = Blockly.Xml.domToPrettyText(xmlDom)
  const blob = new Blob([xmlText], {
    type: 'text/xml;charset=utf-8',
  })
  fileSaver.saveAs(blob, filename)
}

export const disable = (blockObj, message) => {
  if (!blockObj.disabled) {
    if (message) {
      observer.emit('ui.log.warn', message)
    }
    Blockly.Events.recordUndo = false
    blockObj.setDisabled(true)
    Blockly.Events.recordUndo = true
  }
}

export const enable = (blockObj) => {
  Blockly.Events.recordUndo = false
  blockObj.setDisabled(false)
  Blockly.Events.recordUndo = true
}

export const expandDuration = (duration) => `${duration.replace(/t/g, ' tick')
    .replace(/s/g, ' second')
    .replace(/m/g, ' minute')
    .replace(/h/g, ' hour')
    .replace(/d/g, ' day')}(s)`

export const durationToSecond = (duration) => {
  const parsedDuration = duration.match(/^([0-9]+)([stmhd])$/)
  if (!parsedDuration) {
    return null
  }
  const durationValue = parseFloat(parsedDuration[1])
  const durationType = parsedDuration[2]
  if (durationType === 's') {
    return durationValue
  }
  if (durationType === 't') {
    return durationValue * 2
  }
  if (durationType === 'm') {
    return durationValue * 60
  }
  if (durationType === 'h') {
    return durationValue * 60 * 60
  }
  if (durationType === 'd') {
    return durationValue * 60 * 60 * 24
  }
  return null
}
