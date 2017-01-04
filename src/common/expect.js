import { translate } from './i18n'
import { BlocklyError } from './error'

const isNothing = (obj) => obj === undefined || obj === null

export const notEmptyArray = (obj, CustomError = BlocklyError) => {
  if (!isNothing(obj)) {
    if (obj instanceof Array) {
      if (obj.length) {
        return obj
      }
      return new CustomError(
        translate('Expected non-empty array, but the given array is empty.')).emit()
    }
    return new CustomError(
      `${translate('Expected non-empty array, given:')} ${typeof obj}`).emit()
  }
  return new CustomError(
    translate('Expected non-empty array, but nothing was given.')).emit()
}

export const ohlc = (obj, CustomError = BlocklyError) => {
  if (!isNothing(obj)) {
    if (obj instanceof Object) {
      if (!isNaN(obj.open * obj.high * obj.low * obj.close)) {
        return obj
      }
      return new CustomError(
        translate('Expected candle object, but the given object is not a candle.')).emit() // eslint-disable-line max-len
    }
    return new CustomError(
      `${translate('Expected candle object, given:')} ${typeof obj}`).emit()
  }
  return new CustomError(
    translate('Expected candle object, but nothing was given.')).emit()
}

export const tick = (obj, CustomError = BlocklyError) => {
  if (!isNothing(obj)) {
    if (obj instanceof Object && !isNaN(obj.quote)) {
      return obj
    }
    return new CustomError(
      `${translate('Expected tick, given:')} ${obj} of type ${typeof obj}`).emit()
  }
  return new CustomError(
    translate('Expected tick, but nothing was given.')).emit()
}

export const number = (name, obj, CustomError = BlocklyError) => {
  if (typeof obj === 'number') {
    return obj
  }
  return new CustomError(
    `${name} ${translate('must be a number, given:')} ${
    obj} of type ${typeof obj}`).emit()
}

export const barrierOffset = (obj, CustomError = BlocklyError) => {
  number('barrier offset', obj, CustomError)
  if (obj !== 0) {
    return `${obj < 0 ? '' : '+'}${obj}`
  }
  return new CustomError(
    `barrier offset ${translate('cannot be zero.')}`).emit()
}

export const indicatorPeriod = (inputList, period, CustomError = BlocklyError) => {
  number('indicator period', period, CustomError)
  if (period !== 0) {
    if (period < inputList.length) {
      return period
    }
    return new CustomError(
      translate('indicator period must be less than the length of input list.')).emit() // eslint-disable-line max-len
  }
  return new CustomError(
    translate('indicator period cannot be zero.')).emit()
}

export default {
  notEmptyArray,
  ohlc,
  tick,
  number,
  barrierOffset,
  indicatorPeriod,
}
