import { observer } from 'binary-common-utils/lib/observer';
import { translator } from './translator';
import { BlocklyError } from './error';

export const expectNonEmptyArray = (array, CustomError = BlocklyError) => {
  if (array && array instanceof Array && array.length) {
    return array;
  }
  observer.emit(CustomError.name,
    `${translator.translateText('Expected non-empty array, given:')} ${typeof array}`);
  throw new CustomError();
};

export const expectOhlc = (ohlc, CustomError = BlocklyError) => {
  if (ohlc && ohlc instanceof Object &&
    ohlc.open && ohlc.high && ohlc.low && ohlc.close) {
    return ohlc;
  }
  observer.emit(CustomError.name,
    `${translator.translateText('Expected candle object, given:')} ${typeof ohlc}`);
  throw new CustomError();
};

// runtime

export const expectNumber = (name, num, CustomError = BlocklyError) => {
  if (isNaN(parseFloat(num)) || isNaN(Number(num))) {
    observer.emit(CustomError.name,
      `${name} ${translator.translateText('must be a number, given:')} ${typeof num}`);
    throw new CustomError();
  }
  return Number(num);
};

export const expectBarrierOffset = (barrier, CustomError = BlocklyError) => {
  if (barrier.match(/^[-+]\d+$/) === null) {
    observer.emit(CustomError.name,
      translator.translateText('Please use appropriate barrier offset block for barrier offsets'));
    throw new CustomError();
  }
  return barrier;
};
