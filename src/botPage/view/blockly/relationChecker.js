/* eslint-disable no-underscore-dangle */
import { observer } from 'binary-common-utils/lib/observer'
import config from '../../../common/const'
import { bot } from '../../bot'
import { translate } from '../../../common/i18n'
import { findTopParentBlock, disable, enable, durationToSecond, expandDuration } from './utils'

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
const conditionFields = (blockObj, ev) => {
  if ((ev.type === 'change' && ev.element === 'field')
    || (ev.type === 'move' && typeof ev.newInputName === 'string')) {
    const symbol = blockObj.getFieldValue('SYMBOL_LIST')
    const tradeType = blockObj.getFieldValue('TRADETYPE_LIST')
    if (!symbol || !tradeType) {
      return
    }
    const duration = getNumField(blockObj, 'DURATION')
    const durationType = getListField(blockObj, 'DURATIONTYPE_LIST')
    if (duration !== '') {
      const minDuration = bot.symbol.getLimitation(symbol, tradeType).minDuration
      const durationInSeconds = durationToSecond(duration + durationType)
      if (!durationInSeconds) {
        observer.emit('ui.log.warn', translate('Duration must be a positive integer'))
      } else if (durationInSeconds < durationToSecond(minDuration)) {
        observer.emit('ui.log.warn',
          `${translate('Minimum duration is')} ${expandDuration(minDuration)}`)
      } else if (durationType === 't' && !(isInteger(duration) && isInRange(duration, 5, 10))) {
        observer.emit('ui.log.warn',
          translate('Number of ticks must be between 5 and 10'))
      } else if (!isInteger(duration) || duration < 1) {
        observer.emit('ui.log.warn',
          translate('Expiry time cannot be equal to start time'))
      } else {
        observer.emit('tour:ticks')
      }
    }
    const prediction = getNumField(blockObj, 'PREDICTION')
    if (prediction !== '') {
      if (!isInteger(prediction) || !isInRange(prediction, 0, 9)) {
        observer.emit('ui.log.warn', translate('Prediction must be one digit'))
      }
    }
    let inputMissing = false
    for (const il of blockObj.inputList) {
      if (il.connection && blockObj.getInputTargetBlock(il.name) === null) {
        inputMissing = true
      }
    }
    if (!inputMissing) {
      observer.emit('tour:options')
    }
  }
}
export const insideTrade = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else {
    const topParent = findTopParentBlock(blockObj)
    if (topParent && topParent.type !== 'trade') {
      disable(blockObj,
        `${name} ${translate('must be added inside the trade block')}`)
    } else {
      if (topParent && topParent.type === 'trade'
        && blockObj.type === 'market') {
        conditionFields(blockObj, ev)
        observer.emit('tour:market')
      }
      enable(blockObj)
    }
  }
}
export const insideBeforePurchase = (blockObj, ev, name) => {
  if (insideHolder(blockObj)) {
    enable(blockObj)
  } else {
    const topParent = findTopParentBlock(blockObj)
    if (topParent && topParent.type !== 'before_purchase') {
      disable(blockObj,
        `${name} ${translate('must be added inside the before purchase block')}`)
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
        `${name} ${translate('must be added inside the during purchase block')}`)
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
        `${name} ${translate('must be added inside the after purchase block')}`)
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
        translate('must be added inside')
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
