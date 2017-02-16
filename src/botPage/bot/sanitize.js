import { translate } from '../../common/i18n'

const sanitizeTradeOption = tradeOption => {
  const { amount } = tradeOption

  if (isNaN(+amount)) {
    throw Error(translate('Amount must be number'))
  }
}

export const sanitizeStart = args => {
  const [token, tradeOption] = args

  if (!token) {
    throw Error(translate('Please login'))
  }

  sanitizeTradeOption(tradeOption)

  return args
}
