/* eslint-disable no-underscore-dangle */
import config from '../../../common/const'
import { symbolApi, observer } from '../../../common/shared'
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
      const minDuration = symbolApi.getLimitation(symbol, tradeType).minDuration
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
    blockObj.inputList.forEach(il => {
      if (il.connection && blockObj.getInputTargetBlock(il.name) === null) {
        inputMissing = true
      }
    })
    if (!inputMissing) {
      observer.emit('tour:options')
    }
  }
}

const enableIfInside = (blockObj, condition, disableMsg) => {
  const topParent = findTopParentBlock(blockObj)

  if (insideHolder(blockObj) || (topParent && condition(topParent))) {
    enable(blockObj)
    return true
  }
  disable(blockObj, disableMsg)
  return false
}

const insideMain = (blockObj, ev, name, topName, topDesc) => enableIfInside(blockObj,
  topParent => (topParent.type === topName),
  `${name} ${translate('must be added inside:')} ${topDesc}`)

export const insideTrade = (...args) =>
  (insideMain(...args, 'trade', 'trade') && conditionFields(...args))

export const insideBeforePurchase = (...args) =>
  insideMain(...args, 'before_purchase', 'Before Purchase')

export const insideDuringPurchase = (...args) =>
  insideMain(...args, 'during_purchase', 'During Purchase')

export const insideAfterPurchase = (...args) =>
  insideMain(...args, 'after_purchase', 'After Purchase')

const getScopeNames = (scopes) => scopes.map((n) => config.scopeNames[n])

export const insideScope = (blockObj, ev, name, scopes) => enableIfInside(blockObj,
  topParent => (scopes.includes(topParent.type)),
  `${name} ${translate('must be added inside')}: (${getScopeNames(scopes)})`)

export const mainScope = (blockObj, ev, name) => {
  insideScope(blockObj, ev, name, [
    'during_purchase',
    'before_purchase',
    'after_purchase',
    'tick_analysis',
  ])
}
