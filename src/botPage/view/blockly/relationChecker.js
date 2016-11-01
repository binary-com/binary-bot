/* eslint-disable no-underscore-dangle */
import { observer } from 'binary-common-utils/lib/observer'
import config from '../../../common/const'
import { bot } from '../../bot'
import { translator } from '../../../common/translator'
import { findTopParentBlock, addPurchaseOptions,
  disable, enable, durationToSecond, expandDuration } from './utils'

const isInteger = (amount) => !isNaN(+amount) && parseInt(amount, 10) === parseFloat(amount)
const isInRange = (amount, min, max) => !isNaN(+amount) && +amount >= min && +amount <= max
const getNumField = (block, fieldName) => {
  let field = block.getInputTargetBlock(fieldName)
  if (field !== null && field.type === 'math_number') {
    field = field.getFieldValue('NUM')
      .trim()
    return field
  }
  return ''
}
const insideHolder = (blockObj) => {
  const parent = findTopParentBlock(blockObj)
  if (blockObj.isInFlyout) {
    return true
  }
  if (parent !== null && ['block_holder', 'loader'].indexOf(parent.type) >= 0) {
    return true
  }
  return false
}
const getListField = (block, fieldName) => block.getFieldValue(fieldName)
const conditionFields = (blockObj, ev, calledByParent) => {
  if (!calledByParent) {
    if ((ev.type === 'change' && ev.element === 'field')
      || (ev.type === 'move' && typeof ev.newInputName === 'string')) {
      const duration = getNumField(blockObj, 'DURATION')
      const durationType = getListField(blockObj, 'DURATIONTYPE_LIST')
      if (duration !== '') {
        const minDuration = bot.symbol.getLimitation(
          blockObj.parentBlock_.type, blockObj.type).minDuration
        const durationInSeconds = durationToSecond(duration + durationType)
        if (!durationInSeconds) {
          observer.emit('ui.log.warn', translator.translateText('Duration must be a positive integer'))
        } else if (durationInSeconds < durationToSecond(minDuration)) {
          observer.emit('ui.log.warn',
            `${translator.translateText('Minimum duration is')} ${expandDuration(minDuration)}`)
        } else if (durationType === 't') {
          if (!isInteger(duration) || !isInRange(duration, 5, 10)) {
            observer.emit('ui.log.warn',
              translator.translateText('Number of ticks must be between 5 and 10'))
          } else {
            observer.emit('tour:ticks')
          }
        } else if (!isInteger(duration) || duration < 1) {
          observer.emit('ui.log.warn',
            translator.translateText('Expiry time cannot be equal to start time'))
        }
      }
      const prediction = getNumField(blockObj, 'PREDICTION')
      if (prediction !== '') {
        if (!isInteger(prediction) || !isInRange(prediction, 0, 9)) {
          observer.emit('ui.log.warn', translator.translateText('Prediction must be one digit'))
        }
      }
      let inputMissing = false
      for (const il of blockObj.inputList) {
        if (il.name !== '' && blockObj.getInputTargetBlock(il.name) === null) {
          inputMissing = true
        }
      }
      if (!inputMissing) {
        observer.emit('tour:options')
      }
    }
  }
}
export const condition = (blockObj, ev, calledByParent) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else if (blockObj.parentBlock_) {
    if (!(blockObj.parentBlock_.type in bot.symbol.activeSymbols.getSymbols())) {
      disable(blockObj,
        translator.translateText('Trade Type blocks have to be added to submarket blocks'))
    } else if (!bot.symbol.isConditionAllowedInSymbol(blockObj.parentBlock_.type, blockObj.type)) {
      disable(blockObj,
        `${bot.symbol.activeSymbols.getSymbols()[blockObj.parentBlock_.type].display}`
        + ` ${translator.translateText('does not support category:')}`
        + ` ${bot.symbol.getCategoryNameForCondition(blockObj.type)}`
        + `, ${translator.translateText('Allowed categories are')}`
        + ` ${bot.symbol.getAllowedCategoryNames(blockObj.parentBlock_.type)}`)
    } else {
      observer.emit('tour:condition')
      conditionFields(blockObj, ev, calledByParent)
      enable(blockObj)
    }
  } else {
    enable(blockObj)
  }
}
export const insideTrade = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else {
    const topParent = findTopParentBlock(blockObj)
    if (topParent && topParent.type !== 'trade') {
      disable(blockObj,
        `${name} ${translator.translateText('must be added inside the trade block')}`)
    } else {
      if (topParent && topParent.type === 'trade'
        && blockObj.type in bot.symbol.activeSymbols.getSymbols()) {
        addPurchaseOptions(blockObj)
        observer.emit('tour:submarket')
      }
      enable(blockObj)
    }
  }
}
export const submarket = (blockObj, ev) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else {
    if (blockObj.childBlocks_.length > 0 &&
      config.conditions.indexOf(blockObj.childBlocks_[0].type) < 0) {
      observer.emit('ui.log.warn',
        translator.translateText('Submarket blocks can only accept trade type blocks'))
      for (const child of Array.prototype.slice.apply(blockObj.childBlocks_)) {
        Blockly.Events.recordUndo = false
        child.unplug()
        Blockly.Events.recordUndo = true
      }
    } else if (blockObj.childBlocks_.length > 0) {
      condition(blockObj.childBlocks_[0], ev, true)
    }
    insideTrade(blockObj, ev, 'submarket')
  }
}
export const insideTradeType = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else if (blockObj.parentBlock_ && config.conditions.indexOf(blockObj.parentBlock_.type) < 0) {
    disable(blockObj,
      `${name} ${translator.translateText('must be added to the condition block')}`)
  } else {
    enable(blockObj)
  }
}
export const insideBeforePurchase = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else {
    const topParent = findTopParentBlock(blockObj)
    if (topParent && topParent.type !== 'before_purchase') {
      disable(blockObj,
        `${name} ${translator.translateText('must be added inside the before purchase block')}`)
    } else {
      if (topParent && topParent.type === 'before_purchase' && blockObj.type === 'purchase') {
        observer.emit('tour:purchase')
      }
      enable(blockObj)
    }
  }
}
export const insideDuringPurchase = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else {
    const topParent = findTopParentBlock(blockObj)
    if (topParent && topParent.type !== 'during_purchase') {
      disable(blockObj,
        `${name} ${translator.translateText('must be added inside the during purchase block')}`)
    } else {
      enable(blockObj)
    }
  }
}
export const insideAfterPurchase = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else {
    const topParent = findTopParentBlock(blockObj)
    if (topParent && topParent.type !== 'after_purchase') {
      disable(blockObj,
        `${name} ${translator.translateText('must be added inside the after purchase block')}`)
    } else {
      if (topParent && topParent.type === 'after_purchase' && blockObj.type === 'trade_again') {
        observer.emit('tour:trade_again')
      }
      enable(blockObj)
    }
  }
}

const getScopeNames = (scopes) => scopes.map((n) => config.scopeNames[n])

export const insideScope = (blockObj, ev, name, scopes) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else {
    const topParent = findTopParentBlock(blockObj)
    if (topParent && scopes.indexOf(topParent.type) < 0) {
      disable(blockObj,
        `${name} ${
        translator.translateText('must be added either inside one of these')
      }: (${getScopeNames(scopes)})`)
    } else {
      enable(blockObj)
    }
  }
}

export const tickScope = (blockObj, ev, name) => {
  insideScope(blockObj, ev, name, ['during_purchase',
    'before_purchase',
    'timeout',
    'interval',
    'tick_analysis'])
}

export const timeScope = (blockObj, ev, name) => {
  insideScope(blockObj, ev, name, ['before_purchase',
    'during_purchase',
    'after_purchase',
    'timeout',
    'interval',
    'tick_analysis'])
}
