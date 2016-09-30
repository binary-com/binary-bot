import { translator } from './translator';
import { BlocklyError } from './error';

export const expectNonEmptyArray = (array, CustomError = BlocklyError) => {
  if (array && array instanceof Array && array.length) {
    return array;
  }
  return new CustomError(
    `${translator.translateText('Expected non-empty array, given:')} ${typeof array}`).emit();
};

export const expectOhlc = (ohlc, CustomError = BlocklyError) => {
  if (ohlc && ohlc instanceof Object &&
    ohlc.open && ohlc.high && ohlc.low && ohlc.close) {
    return ohlc;
  }
  return new CustomError(
    `${translator.translateText('Expected candle object, given:')} ${typeof ohlc}`).emit();
};

export const expectTick = (tick, CustomError = BlocklyError) => {
  if (tick && tick instanceof Object && tick.quote) {
    return tick;
  }
  return new CustomError(
    `${translator.translateText('Expected tick, given:')} ${typeof tick}`).emit();
};

// runtime

export const expectNumber = (name, num, CustomError = BlocklyError) => {
  if (isNaN(parseFloat(num)) || isNaN(Number(num))) {
    return new CustomError(
      `${name} ${translator.translateText('must be a number, given:')} ${typeof num}`).emit();
  }
  return Number(num);
};

export const expectBarrierOffset = (num, CustomError = BlocklyError) => {
  expectNumber('barrier offset', num, CustomError);
  if (num === 0) {
    return new CustomError(
      `barrier offset ${translator.translateText('cannot be zero.')}`).emit();
  }
  return `${num < 0 ? '' : '+'}${num}`;
};
