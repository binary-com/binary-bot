import { observer as globalObserver } from '../../common/utils/observer';
import { getToken } from '../../common/utils/storageManager';
import { trackJSNetworkMonitor } from '../../../../deriv-app/packages/trader/src/Services/trackjs';

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

const notify = ({ className, message, position = 'left', sound = 'silent' }) => {
    log(className, message);

    $.notify(message, { position: `bottom ${position}`, className });
    if (sound !== 'silent') {
        $(`#${sound}`)
            .get(0)
            .play();
    }
};

const notifyError = error => {
    if (!error) {
        return;
    }

    let message;
    let code;

    if (error.error) {
        if (error.error.error) {
            ({ message } = error.error.error);
            ({ code } = error.error.error);
        } else {
            ({ message } = error.error);
            ({ code } = error.error);
        }
    }

    // Exceptions:
    if (message === 'Cannot read property \'open_time\' of undefined') {
        // SmartCharts error workaround, don't log nor show.
        return;
    }

    notify({ className: 'error', message, position: 'right' });

    if (trackJs) {
        trackJs.console.log(error);
        trackJs.track(code);
    }
};

const waitForNotifications = () => {
    const notifList = ['success', 'info', 'warn', 'error'];

    globalObserver.register('Notify', notify);

    globalObserver.register('Error', notifyError);

    notifList.forEach(className =>
        globalObserver.register(`ui.log.${className}`, message => notify({ className, message, position: 'right' }))
    );
};

const logHandler = () => {
    const token = $('.account-id')
        .first()
        .attr('value');
    const userId = getToken(token).accountName;

    if (trackJs) {
        trackJs.configure({ userId });
    }

    waitForNotifications();
};

export default logHandler;
