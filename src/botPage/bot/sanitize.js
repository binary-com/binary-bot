import { translate } from '../../common/i18n'

const sanitizeTradeOption = tradeOption => {
  const { symbol, contractTypes, amount, duration } = tradeOption

  if (!symbol) {
    throw Error(translate('Underlying market is not selected'))
  }

  if (!contractTypes[0]) {
    throw Error(translate('Contract type is not selected'))
  }

  if (isNaN(+duration)) {
    throw Error(translate('Duration must be number'))
  }

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
