import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { getToken } from 'binary-common-utils/lib/storageManager';
import { translate } from '../../common/i18n';
import updateLogTable from './updateLogTable';

const log = (type, ...args) => {
    if (type === 'warn') {
        console.warn(...args); // eslint-disable-line no-console
    } else {
        console.log(...args); // eslint-disable-line no-console
    }
    const date = new Date();
    const timestamp = `${date
    .toISOString()
    .split('T')[0]} ${date.toTimeString().slice(0, 8)}`;
    updateLogTable({ type, timestamp, message: args.join(':') });
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

const notify = (className, msg, position = 'left') => {
    if (msg && isNewNotification(msg)) {
        log(className, msg);
        $.notify(msg, { position: `bottom ${position}`, className });
    }
};

const notifyError = error => {
    if (!error) {
        return;
    }

    let message = error.message;
    let errorCode = error.name;

    if (error.error) {
        message = error.error.message;
        errorCode = error.error.errorCode;
        if (error.error.error) {
            message = error.error.error.message;
            message = error.error.error.message;
            errorCode = error.error.error.errorCode;
        }
    }

    if (errorCode === 'DisconnectError') {
        message = translate(
      'Connection lost before receiving the response from the server'
    );
    }

    const errorWithCode = new Error(error);
    errorWithCode.message = errorCode ? `${errorCode}: ${message}` : message;

    if (trackJs && isNewError(message)) {
        trackJs.track(errorWithCode);
    }

    notify('error', message, 'right');
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

    logList.forEach(event =>
    globalObserver.register(event, d => log('info', event, d))
  );

    globalObserver.register('Notify', args => notify(...args));

    globalObserver.register('Error', notifyError);

    notifList.forEach(className =>
    globalObserver.register(`ui.log.${className}`, message =>
      notify(className, message, 'right')
    )
  );

    amplitudeList.forEach(event =>
    globalObserver.register(event, d =>
      amplitude.getInstance().logEvent(event, d)
    )
  );

    globalObserver.register('log.revenue', data => {
        const { user, profit, contract } = data;

        if (typeof amplitude !== 'undefined' && !user.isVirtual) {
            const revenue = new amplitude.Revenue()
        .setProductId(`${contract.underlying}.${contract.contract_type}`)
        .setPrice(-profit)
        .setRevenueType(profit < 0 ? 'loss' : 'win');

            amplitude.getInstance().logRevenueV2(revenue, { contract });
        }
    });
};

const logHandler = () => {
    const token = $('.account-id').first().attr('value');
    const userId = getToken(token).account_name;

    if (amplitude) {
        amplitude.getInstance().setUserId(userId);
    }

    if (trackJs) {
        trackJs.configure({ userId });
    }

    waitForNotifications();
};

export default logHandler;
