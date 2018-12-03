import { getUTCTime } from '../../common/utils/tools';
import { translate } from '../../common/i18n';
import { roundBalance } from '../common/tools';
import { notify } from './broadcast';

export const noop = () => {};

const castBarrierToString = barrier => (barrier > 0 ? `+${barrier}` : `${barrier}`);

export const tradeOptionToProposal = tradeOption =>
    tradeOption.contractTypes.map(type => ({
        duration_unit: tradeOption.duration_unit,
        basis        : 'stake',
        currency     : tradeOption.currency,
        symbol       : tradeOption.symbol,
        duration     : tradeOption.duration,
        amount       : roundBalance({ currency: tradeOption.currency, balance: tradeOption.amount }),
        contract_type: type,
        ...(tradeOption.prediction !== undefined && {
            selected_tick: tradeOption.prediction,
        }),
        ...(type !== 'TICKLOW' &&
            type !== 'TICKHIGH' &&
            tradeOption.prediction !== undefined && {
                barrier: tradeOption.prediction,
            }),
        ...(tradeOption.barrierOffset !== undefined && {
            barrier: castBarrierToString(tradeOption.barrierOffset),
        }),
        ...(tradeOption.secondBarrierOffset !== undefined && {
            barrier2: castBarrierToString(tradeOption.secondBarrierOffset),
        }),
    }));

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

export const shouldThrowError = (e, types = [], delayIndex = 0) =>
    e &&
    (!types
        .concat(['CallError', 'WrongResponse', 'GetProposalFailure', 'RateLimit', 'DisconnectError'])
        .includes(e.name) ||
        (e.name !== 'DisconnectError' && delayIndex > maxRetries));

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

export const createDetails = contract => {
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
    ];
};

export const getUUID = () => `${new Date().getTime() * Math.random()}`;
