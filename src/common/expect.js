import { translate } from './i18n'
import { throwError } from './shared'

const isNothing = (obj) => obj === undefined || obj === null

export const notEmptyArray = (obj) => {
  if (!isNothing(obj)) {
    if (obj instanceof Array) {
      if (obj.length) {
        return obj
      }
      throwError(
        translate('Expected non-empty array, but the given array is empty.'))
    }
    throwError(
      `${translate('Expected non-empty array, given:')} ${typeof obj}`)
  }
  throwError(
    translate('Expected non-empty array, but nothing was given.'))
}

export const ohlc = (obj) => {
  if (!isNothing(obj)) {
    if (obj instanceof Object) {
      if (!isNaN(obj.open * obj.high * obj.low * obj.close)) {
        return obj
      }
      throwError(
        translate('Expected candle object, but the given object is not a candle.')) // eslint-disable-line max-len
    }
    throwError(
      `${translate('Expected candle object, given:')} ${typeof obj}`)
  }
  throwError(
    translate('Expected candle object, but nothing was given.'))
}

export const tick = (obj) => {
  if (!isNothing(obj)) {
    if (obj instanceof Object && !isNaN(obj.quote)) {
      return obj
    }
    throwError(
      `${translate('Expected tick, given:')} ${obj} of type ${typeof obj}`)
  }
  throwError(
    translate('Expected tick, but nothing was given.'))
}

export const number = (name, obj) => {
  if (typeof obj === 'number') {
    return obj
  }
  throwError(
    `${name} ${translate('must be a number, given:')} ${obj} of type ${typeof obj}`)
}

export const barrierOffset = (obj) => {
  number('barrier offset', obj)
  if (obj !== 0) {
    return `${obj < 0 ? '' : '+'}${obj}`
  }
  throwError(`barrier offset ${translate('cannot be zero.')}`)
}

export const indicatorPeriod = (inputList, period) => {
  number('indicator period', period)
  if (period !== 0) {
    if (period < inputList.length) {
      return period
    }
    throwError(
      translate('indicator period must be less than the length of input list.')) // eslint-disable-line max-len
  }
  throwError(translate('indicator period cannot be zero.'))
}
