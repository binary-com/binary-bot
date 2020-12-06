import { observer as globalObserver } from '../../common/utils/observer';

export const contract = c => globalObserver.emit('bot.contract', c);

export const contractStatus = c => globalObserver.emit('contract.status', c);

export const contractSettled = c => globalObserver.emit('contract.settled', c);

export const info = i => globalObserver.emit('bot.info', i);

export const notify = (className, message) => globalObserver.emit('Notify', { className, message, position: 'right' });
