import { observer } from 'binary-common-utils/lib/observer'
import { getToken } from 'binary-common-utils/lib/storageManager'
import { translate } from '../../common/i18n'

const shown = []

const isNew = (message) => {
  const timestamp = parseInt(new Date().getTime() / 1000, 10)
  const index = shown.findIndex((e) => e.message === message)
  if (index >= 0) {
    const oldTimestamp = shown[index].timestamp
    shown[index].timestamp = timestamp
    if (timestamp - oldTimestamp >= 1) {
      return true
    }
    return false
  }
  shown.push({
    message,
    timestamp,
  })
  return true
}

const notify = (message, ...args) => {
  if (isNew(message)) {
    $.notify(message, ...args)
  }
}

export const notifyError = (error) => {
  let message = (error.error) ?
    error.error.message :
    error.message || error
  const errorCode = error.error ?
    error.error.code :
    error.name

  if (error.name === 'DisconnectError') {
    message = translate('Connection lost before receiving the response from the server')
  }

  const completeMsg = errorCode ?
    `${errorCode}: ${message}` : message
  notify(message, {
    position: 'bottom right',
    className: 'error',
  })
  console.warn(error) // eslint-disable-line no-console
  console.error(completeMsg) // eslint-disable-line no-console
  return message
}

export const logHandler = () => {
  // catch known errors and log them
  ['api.error', 'BlocklyError', 'RuntimeError', 'LimitsReached'].forEach(errorType =>
    observer.register(errorType, (error) => { // eslint-disable-line no-loop-func
      const message = notifyError(error)
      amplitude.getInstance().logEvent(errorType, {
        message,
      })
    }))

  const token = $('.account-id').first().attr('value')
  const accountName = getToken(token).account_name
  if (typeof amplitude !== 'undefined') {
    amplitude.getInstance().setUserId(accountName)
  }
  if (typeof trackJs !== 'undefined') {
    trackJs.configure({
      userId: accountName,
    })
  }

  const observeForLog = (type, position) => {
    const subtype = (position === 'left') ? '.left' : ''
    observer.register(`ui.log.${type}${subtype}`, (message) => {
      if (type === 'warn') {
        console.warn(message) // eslint-disable-line no-console
      } else {
        console.log(message) // eslint-disable-line no-console
      }
      if (position === 'left') {
        $.notify(message, {
          position: `bottom ${position}`,
          className: type,
        })
      } else {
        notify(message, {
          position: `bottom ${position}`,
          className: type,
        })
      }
    })
  }

  ['success', 'info', 'warn', 'error'].forEach(type => {
    observeForLog(type, 'right')
    observeForLog(type, 'left')
  })

  const logList = [
    'log.bot.start',
    'log.bot.login',
    'log.bot.proposal',
    'log.purchase.start',
    'log.trade.purchase',
    'log.trade.update',
    'log.trade.finish',
  ]

  logList.forEach(event =>
    observer.register(event, d => console.log(event, d))) // eslint-disable-line no-console

  const amplitudeList = ['log.bot.login', 'log.trade.finish']

  amplitudeList.forEach(event =>
    observer.register(event, d => amplitude.getInstance().logEvent(event, d)))

  observer.register('log.revenue', data => {
    const { user, profit, contract } = data
    if (typeof amplitude !== 'undefined') {
      if (!user.isVirtual) {
        const revenue = new amplitude.Revenue()
          .setProductId(`${contract.underlying}.${contract.contract_type}`)
          .setPrice(-profit)
          .setRevenueType((profit < 0) ? 'loss' : 'win')
        amplitude.getInstance().logRevenueV2(revenue, {
          contract,
        })
      }
    }
  })
}
