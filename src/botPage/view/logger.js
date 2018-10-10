import { observer as globalObserver } from '../../common/utils/observer';
import { getToken } from '../../common/utils/storageManager';
import { translate } from '../../common/i18n';
import { isVirtual } from '../common/tools';

const log = (type, ...args) => {
    if (type === 'warn') {
        console.warn(...args); // eslint-disable-line no-console
    } else {
        console.log(...args); // eslint-disable-line no-console
    }
    const date = new Date();
    const timestamp = `${date.toISOString().split('T')[0]} ${date.toTimeString().slice(0, 8)} ${
        date.toTimeString().split(' ')[1]
    }`;
    globalObserver.emit('bot.notify', { type, timestamp, message: args.join(':') });
};

const isNewMessage = (shown = []) => msg => {
    const timestamp = parseInt(new Date().getTime() / 1000);

    const shownMsg = shown.find(e => e.msg === msg);
    if (shownMsg) {
        const oldTimestamp = shownMsg.timestamp;

        shownMsg.timestamp = timestamp;
        return timestamp - oldTimestamp >= 1;
    }

    shown.push({ msg, timestamp });
    return true;
};

const isNewNotification = isNewMessage();

const isNewError = isNewMessage();

const notify = ({ className, message, position = 'left', sound = 'silent' }) => {
    if (message && (position === 'left' || isNewNotification(message))) {
        log(className, message);
        $.notify(message, { position: `bottom ${position}`, className });
        if (sound !== 'silent') {
            $(`#${sound}`)
                .get(0)
                .play();
        }
    }
};

const notifyError = error => {
    if (!error) {
        return;
    }

    let { message } = error;
    let errorCode = error.name;

    if (error.error) {
        ({ message } = error.error);
        ({ errorCode } = error.error);
        if (error.error.error) {
            ({ message } = error.error.error);
            ({ errorCode } = error.error.error);
        }
    }

    if (errorCode === 'DisconnectError') {
        message = translate('Connection lost before receiving the response from the server');
    }

    const errorWithCode = new Error(error);
    errorWithCode.message = errorCode ? `${errorCode}: ${message}` : message;

    if (trackJs && isNewError(message)) {
        trackJs.track(errorWithCode);
    }

    notify({ className: 'error', message, position: 'right' });
};

const waitForNotifications = () => {
    const notifList = ['success', 'info', 'warn', 'error'];

    const logList = [
        'log.bot.start',
        'log.bot.login',
        'log.bot.proposal',
        'log.purchase.start',
        'log.trade.purchase',
        'log.trade.update',
        'log.trade.finish',
    ];

    const amplitudeList = ['log.bot.login', 'log.trade.finish'];

    logList.forEach(event => globalObserver.register(event, d => log('info', event, d)));

    globalObserver.register('Notify', notify);

    globalObserver.register('Error', notifyError);

    notifList.forEach(className =>
        globalObserver.register(`ui.log.${className}`, message => notify({ className, message, position: 'right' }))
    );

    amplitudeList.forEach(event => globalObserver.register(event, d => amplitude.getInstance().logEvent(event, d)));

    globalObserver.register('log.revenue', data => {
        const { user, profit, contract } = data;

        if (typeof amplitude !== 'undefined' && !isVirtual(user)) {
            const revenue = new amplitude.Revenue()
                .setProductId(`${contract.underlying}.${contract.contract_type}`)
                .setPrice(-profit)
                .setRevenueType(profit < 0 ? 'loss' : 'win');

            amplitude.getInstance().logRevenueV2(revenue, { contract });
        }
    });
};

const logHandler = () => {
    const token = $('.account-id')
        .first()
        .attr('value');
    const userId = getToken(token).accountName;

    if (amplitude) {
        amplitude.getInstance().setUserId(userId);
    }

    if (trackJs) {
        trackJs.configure({ userId });
    }

    waitForNotifications();
};

export default logHandler;
