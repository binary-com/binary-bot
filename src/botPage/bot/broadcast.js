import { observer as globalObserver } from 'binary-common-utils/lib/observer'

export const contract = c => globalObserver.emit('bot.contract', c)

export const info = i => globalObserver.emit('bot.info', i)

export const error = e => globalObserver.emit('Error', e)

export const notify = (type, msg) => globalObserver.emit('Notify', [type, msg, 'right'])
