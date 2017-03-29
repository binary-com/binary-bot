import { observer as globalObserver } from 'binary-common-utils/lib/observer'
import { translate } from '../../common/i18n'
import { createError } from '../common/error'

const isPositiveNumber = num => Number.isFinite(num) && num > 0

const isPositiveInteger = num => isPositiveNumber(num) && Number.isInteger(num)

export const expectPositiveInteger = (num, msg) => {
  if (!isPositiveInteger(num)) {
    const error = createError('PositiveIntegerExpected', msg)
    globalObserver.emit('Error', error)
    throw error
  }
  return num
}

export const expectPositiveNumber = (num, msg) => {
  if (!isPositiveNumber(num)) {
    const error = createError('PositiveNumberExpected', msg)
    globalObserver.emit('Error', error)
    throw error
  }
  return num
}

const sanitizeTradeOption = tradeOption => {
  const { symbol, contractTypes, amount, duration } = tradeOption

  if (!symbol) {
    const error = createError('OptionError', translate('Underlying market is not selected'))
    globalObserver.emit('Error', error)
    throw error
  }

  if (!contractTypes[0]) {
    const error = createError('OptionError', translate('Contract type is not selected'))
    globalObserver.emit('Error', error)
    throw error
  }

  expectPositiveInteger(duration, translate('Duration must be an integer'))

  expectPositiveNumber(amount, translate('Amount must be a positive number'))
}

export const sanitizeStart = args => {
  const [token, tradeOption] = args

  if (!token) {
    const error = createError('LoginError', translate('Please login'))
    globalObserver.emit('Error', error)
    throw error
  }

  sanitizeTradeOption(tradeOption)

  return args
}

