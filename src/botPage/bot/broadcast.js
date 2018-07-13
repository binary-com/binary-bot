import { observer as globalObserver } from 'binary-common-utils/lib/observer';

export const contract = c => globalObserver.emit('bot.contract', c);

export const contractStatus = c => globalObserver.emit('contract.status', c);

export const info = i => globalObserver.emit('bot.info', i);

export const notify = (className, message) => globalObserver.emit('Notify', { className, message, position: 'right' });
