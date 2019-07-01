import { translate } from '../../common/i18n';
import { createError } from '../common/error';

const isPositiveNumber = num => Number.isFinite(num) && num > 0;

const isPositiveInteger = num => isPositiveNumber(num) && Number.isInteger(num);

export const expectPositiveInteger = (num, msg) => {
    if (!isPositiveInteger(num)) {
        throw createError('PositiveIntegerExpected', msg);
    }
    return num;
};

export const expectPositiveNumber = (num, msg) => {
    if (!isPositiveNumber(num)) {
        throw createError('PositiveNumberExpected', msg);
    }
    return num;
};

const expectOptions = options => {
    const { symbol, contractTypes } = options;

    if (!symbol) {
        throw createError('OptionError', translate('Underlying market is not selected'));
    }

    if (!contractTypes[0]) {
        throw createError('OptionError', translate('Contract type is not selected'));
    }
};

export const expectInitArg = args => {
    const [token, options] = args;

    if (!token) {
        throw createError('LoginError', translate('Please login'));
    }

    expectOptions(options);

    return args;
};

export const expectTradeOptions = tradeOptions => {
    const { amount, duration } = tradeOptions;

    expectPositiveInteger(duration, translate('Duration must be a positive integer'));

    expectPositiveNumber(amount, translate('Amount must be a positive number'));

    return tradeOptions;
};

const isCandle = candle =>
    candle instanceof Object &&
    ['open', 'high', 'low', 'close'].every(key => isPositiveNumber(candle[key])) &&
    isPositiveInteger(candle.epoch);

export const expectCandle = candle => {
    if (!isCandle(candle)) {
        throw createError('CandleExpected', translate('Given candle is not valid'));
    }
    return candle;
};

export const expectCandles = candles => {
    if (!(candles instanceof Array) || !candles.every(c => isCandle(c))) {
        throw createError('CandleListExpected', translate('Given candle list is not valid'));
    }
    return candles;
};
