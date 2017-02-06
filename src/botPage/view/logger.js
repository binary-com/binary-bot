import { getToken } from 'binary-common-utils/lib/storageManager'
import { translate } from '../../common/i18n'
import { observer } from '../common/shared'

const log = (type, ...args) => {
  if (type === 'warn') {
    console.warn(...args) // eslint-disable-line no-console
  } else if (type === 'error') {
    console.error(...args) // eslint-disable-line no-console
  } else {
    console.log(...args) // eslint-disable-line no-console
  }
}

const shown = []

const isNew = msg => {
  const timestamp = parseInt(new Date().getTime() / 1000, 10)

  const shownMsg = shown.find(e => e.msg === msg)
  if (shownMsg) {
    const oldTimestamp = shownMsg.timestamp

    shownMsg.timestamp = timestamp
    return (timestamp - oldTimestamp) >= 1
  }

  shown.push({ msg, timestamp })
  return true
}

const notifyUniq = (msg, ...args) => isNew(msg) && $.notify(msg, ...args)

const notify = (msg, className, position = 'left', ...rest) => {
  log(className, msg, ...rest)
  notifyUniq(msg, { position: `bottom ${position}`, className })
}

const notifyError = (error) => {
  let message = (error.error) ?
    error.error.message : error.message || error
  const errorCode = error.error ?
    error.error.code : error.name

  if (error.name === 'DisconnectError') {
    message = translate('Connection lost before receiving the response from the server')
  }

  const completeMsg = errorCode ? `${errorCode}: ${message}` : message

  notify(message, 'error', 'right', error, completeMsg)
}

const waitForNotifications = () => {
  const errorList = ['api.error', 'BlocklyError', 'LimitsReached']

  const notifList = ['success', 'info', 'warn', 'error']

  const logList = [
    'log.bot.start',
    'log.bot.login',
    'log.bot.proposal',
    'log.purchase.start',
    'log.trade.purchase',
    'log.trade.update',
    'log.trade.finish',
  ]

  const amplitudeList = ['log.bot.login', 'log.trade.finish']

  logList.forEach(event =>
    observer.register(event, d => log('info', event, d)))

  observer.register('NotifyError', notifyError)
  observer.register('Notify', notify)

  errorList.forEach(type => observer.register(type, e => notifyError(e)))

  notifList.forEach(className =>
    observer.register(`ui.log.${className}`, message =>
      notify(message, className, 'right')))

  amplitudeList.forEach(event =>
    observer.register(event, (d) => amplitude.getInstance().logEvent(event, d)))

  observer.register('log.revenue', (data) => {
    const { user, profit, contract } = data

    if (typeof amplitude !== 'undefined' && !user.isVirtual) {
      const revenue = new amplitude.Revenue()
        .setProductId(`${contract.underlying}.${contract.contract_type}`)
        .setPrice(-profit).setRevenueType((profit < 0) ? 'loss' : 'win')

      amplitude.getInstance().logRevenueV2(revenue, { contract })
    }
  })
}

export const logHandler = () => {
  const token = $('.account-id').first().attr('value')
  const userId = getToken(token).account_name

  if (amplitude) {
    amplitude.getInstance().setUserId(userId)
  }

  if (trackJs) {
    trackJs.configure({ userId })
  }

  waitForNotifications()
}
