import { translate } from '../../common/i18n'
import { createError } from '../common/error'

const isPositiveNumber = num => Number.isFinite(num) && num > 0

const isPositiveInteger = num => isPositiveNumber(num) && Number.isInteger(num)

export const expectPositiveInteger = (num, msg) => {
  if (!isPositiveInteger(num)) {
    throw createError('PositiveIntegerExpected', msg)
  }
  return num
}

export const expectPositiveNumber = (num, msg) => {
  if (!isPositiveNumber(num)) {
    throw createError('PositiveNumberExpected', msg)
  }
  return num
}

const sanitizeTradeOption = tradeOption => {
  const { symbol, contractTypes, amount, duration } = tradeOption

  if (!symbol) {
    throw createError('OptionError', translate('Underlying market is not selected'))
  }

  if (!contractTypes[0]) {
    throw createError('OptionError', translate('Contract type is not selected'))
  }

  expectPositiveInteger(duration, translate('Duration must be an integer'))

  expectPositiveNumber(amount, translate('Amount must be a positive number'))
}

export const sanitizeStart = args => {
  const [token, tradeOption] = args

  if (!token) {
    throw createError('LoginError', translate('Please login'))
  }

  sanitizeTradeOption(tradeOption)

  return args
}

