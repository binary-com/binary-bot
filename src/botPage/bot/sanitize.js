import { translate } from '../../common/i18n'
import { createError } from '../common/error'

const sanitizeTradeOption = tradeOption => {
  const { symbol, contractTypes, amount, duration } = tradeOption

  if (!symbol) {
    throw createError('OptionError', translate('Underlying market is not selected'))
  }

  if (!contractTypes[0]) {
    throw createError('OptionError', translate('Contract type is not selected'))
  }

  if (!Number.isInteger(duration)) {
    throw createError('OptionError', translate('Duration must be a positive integer'))
  }

  if (!Number.isFinite(amount)) {
    throw createError('OptionError', translate('Amount must be number'))
  }
}

export const sanitizeStart = args => {
  const [token, tradeOption] = args

  if (!token) {
    throw createError('LoginError', translate('Please login'))
  }

  sanitizeTradeOption(tradeOption)

  return args
}
