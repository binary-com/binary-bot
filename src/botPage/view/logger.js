import { observer } from 'binary-common-utils/lib/observer'
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
  for (const errorType of ['api.error', 'BlocklyError', 'RuntimeError', 'LimitsReached']) {
    observer.register(errorType, (error) => { // eslint-disable-line no-loop-func
      const message = notifyError(error)
      amplitude.getInstance().logEvent(errorType, {
        message,
      })
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

  for (const type of ['success', 'info', 'warn', 'error']) {
    observeForLog(type, 'right')
    observeForLog(type, 'left')
  }

  for (const event of [
      'log.bot.start', 'log.bot.login', 'log.bot.proposal',
      'log.bot.stop', 'log.purchase.start', 'log.purchase.purchase',
      'log.purchase.win', 'log.purchase.loss',
      'log.trade.purchase', 'log.trade.update', 'log.trade.finish']) {
    observer.register(event, (d) => console.log(event, d)) // eslint-disable-line no-console
  }

  for (const event of ['log.bot.login', 'log.trade.finish']) {
    observer.register(event, (d) => amplitude.getInstance().logEvent(event, d))
  }

  observer.register('log.revenue', (data) => {
    const {
      user,
      profit,
      contract,
    } = data
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
