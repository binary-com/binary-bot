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

// runtime

export const expectNumber = (name, num, CustomError = BlocklyError) => {
  if (isNaN(parseFloat(num)) || isNaN(Number(num))) {
    return new CustomError(
      `${name} ${translator.translateText('must be a number, given:')} ${typeof num}`).emit();
  }
  return Number(num);
};

export const expectBarrierOffset = (barrier, CustomError = BlocklyError) => {
  if (barrier.match(/^[-+]\d+$/) === null) {
    return new CustomError(
      translator.translateText('Please use appropriate barrier offset block for barrier offsets'))
        .emit();
  }
  return barrier;
};
