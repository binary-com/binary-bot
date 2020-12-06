import { getUTCTime } from '../../common/utils/tools';
import { translate } from '../../common/i18n';
import { roundBalance } from '../common/tools';
import { notify } from './broadcast';

export const noop = () => {};

export const tradeOptionToProposal = (tradeOption, purchaseReference) =>
    tradeOption.contractTypes.map(type => {
        const proposal = {
            duration_unit: tradeOption.duration_unit,
            basis        : tradeOption.basis,
            currency     : tradeOption.currency,
            symbol       : tradeOption.symbol,
            duration     : tradeOption.duration,
            amount       : roundBalance({ currency: tradeOption.currency, balance: tradeOption.amount }),
            contract_type: type,
            passthrough  : {
                contractType: type,
                purchaseReference,
            },
        };
        if (tradeOption.prediction !== undefined) {
            proposal.selected_tick = tradeOption.prediction;
        }
        if (!['TICKLOW', 'TICKHIGH'].includes(type) && tradeOption.prediction !== undefined) {
            proposal.barrier = tradeOption.prediction;
        } else if (tradeOption.barrierOffset !== undefined) {
            proposal.barrier = tradeOption.barrierOffset;
        }
        if (tradeOption.secondBarrierOffset !== undefined) {
            proposal.barrier2 = tradeOption.secondBarrierOffset;
        }
        return proposal;
    });

export const getDirection = ticks => {
    const { length } = ticks;
    const [tickOld, tickNew] = ticks.slice(-2);

    let direction = '';
    if (length >= 2) {
        direction = tickOld.quote < tickNew.quote ? 'rise' : direction;
        direction = tickOld.quote > tickNew.quote ? 'fall' : direction;
    }

    return direction;
};

export const getLastDigit = (tick, pipSize) => Number(tick.toFixed(pipSize).slice(-1)[0]);

export const subscribeToStream = (observer, name, respHandler, request, registerOnce, type, unregister) =>
    new Promise(resolve => {
        observer.register(
            name,
            (...args) => {
                respHandler(...args);
                resolve();
            },
            registerOnce,
            type && { type, unregister },
            true
        );
        request();
    });

export const registerStream = (observer, name, cb) => {
    if (observer.isRegistered(name)) {
        return;
    }
    observer.register(name, cb);
};

const maxRetries = 12;

const notifyRetry = (msg, error, delay) =>
    notify('warn', `${msg}: ${error.error.msg_type}, ${translate('retrying in')} ${delay}s`);

const getBackoffDelay = (error, delayIndex) => {
    const offset = 0.5; // 500ms

    const errorCode = error && error.name;

    if (errorCode === 'DisconnectError') {
        return offset * 1000;
    }

    const maxExpTries = 4;
    const exponentialIncrease = 2 ** delayIndex + offset;

    if (errorCode === 'RateLimit' || delayIndex < maxExpTries) {
        notifyRetry(translate('Rate limit reached for'), error, exponentialIncrease);
        return exponentialIncrease * 1000;
    }

    const linearIncrease = exponentialIncrease + (maxExpTries - delayIndex + 1);

    notifyRetry(translate('Request failed for'), error, linearIncrease);
    return linearIncrease * 1000;
};

export const shouldThrowError = (error, types = [], delayIndex = 0) => {
    if (!error) {
        return false;
    }

    const defaultErrors = ['CallError', 'WrongResponse', 'GetProposalFailure', 'RateLimit', 'DisconnectError'];
    const authErrors = ['InvalidToken', 'AuthorizationRequired'];
    const errors = types.concat(defaultErrors);

    if (authErrors.includes(error.name)) {
        // If auth error, reload page.
        window.location.reload();
        return true;
    } else if (!errors.includes(error.name)) {
        // If error is unrecoverable, throw error.
        return true;
    } else if (error.name !== 'DisconnectError' && delayIndex > maxRetries) {
        // If exceeded maxRetries, throw error.
        return true;
    }

    return false;
};

export const recoverFromError = (f, r, types, delayIndex) =>
    new Promise((resolve, reject) => {
        const promise = f();

        if (!promise) {
            resolve();
            return;
        }

        promise.then(resolve).catch(e => {
            if (shouldThrowError(e, types, delayIndex)) {
                reject(e);
                return;
            }

            r(e.name, () => new Promise(delayPromise => setTimeout(delayPromise, getBackoffDelay(e, delayIndex))));
        });
    });

export const doUntilDone = (f, types) => {
    let delayIndex = 0;

    return new Promise((resolve, reject) => {
        const repeat = () => {
            recoverFromError(f, (errorCode, makeDelay) => makeDelay().then(repeat), types, delayIndex++)
                .then(resolve)
                .catch(reject);
        };
        repeat();
    });
};

export const createDetails = (contract, pipSize) => {
    const { sell_price: sellPrice, buy_price: buyPrice, currency } = contract;
    const profit = Number(roundBalance({ currency, balance: sellPrice - buyPrice }));
    const result = profit < 0 ? 'loss' : 'win';

    return [
        contract.transaction_ids.buy,
        +contract.buy_price,
        +contract.sell_price,
        profit,
        contract.contract_type,
        getUTCTime(new Date(parseInt(`${contract.entry_tick_time}000`))),
        +contract.entry_tick,
        getUTCTime(new Date(parseInt(`${contract.exit_tick_time}000`))),
        +contract.exit_tick,
        +(contract.barrier ? contract.barrier : 0),
        result,
        (+contract.entry_tick).toFixed(pipSize),
        (+contract.exit_tick).toFixed(pipSize),
    ];
};

export const getUUID = () => `${new Date().getTime() * Math.random()}`;

export const showDialog = options =>
    new Promise((resolve, reject) => {
        const $dialog = $('<div/>', { class: 'draggable-dialog', title: options.title });
        options.text.forEach(text => $dialog.append(`<p style="margin: 0.7em;">${text}</p>`));
        const defaultButtons = [
            {
                text : translate('No'),
                class: 'button-secondary',
                click() {
                    $(this).dialog('close');
                    $(this).remove();
                    reject();
                },
            },
            {
                text : translate('Yes'),
                class: 'button-primary',
                click() {
                    $(this).dialog('close');
                    $(this).remove();
                    resolve();
                },
            },
        ];
        const dialogOptions = {
            autoOpen : false,
            classes  : { 'ui-dialog-titlebar-close': 'icon-close' },
            closeText: '',
            height   : 'auto',
            width    : 600,
            modal    : true,
            resizable: false,
            open() {
                $(this)
                    .parent()
                    .find('.ui-dialog-buttonset > button')
                    .removeClass('ui-button ui-corner-all ui-widget');
            },
        };
        Object.assign(dialogOptions, { buttons: options.buttons || defaultButtons });

        $dialog.dialog(dialogOptions);
        $dialog.dialog('open');
    });
