import { observer } from 'binary-common-utils/lib/observer';
import { translator } from './translator';
import { BlocklyError } from './error';

export const expectNonEmptyArray = (array, CustomError = BlocklyError) => {
  if (array && array instanceof Array && array.length) {
    return array;
  }
  observer.emit(new CustomError().name,
    `${translator.translateText('Expected non-empty array, given:')} ${typeof array}`);
  return new CustomError().emit();
};

export const expectOhlc = (ohlc, CustomError = BlocklyError) => {
  if (ohlc && ohlc instanceof Object &&
    ohlc.open && ohlc.high && ohlc.low && ohlc.close) {
    return ohlc;
  }
  observer.emit(new CustomError().name,
    `${translator.translateText('Expected candle object, given:')} ${typeof ohlc}`);
  return new CustomError().emit();
};

// runtime

export const expectNumber = (name, num, CustomError = BlocklyError) => {
  if (isNaN(parseFloat(num)) || isNaN(Number(num))) {
    observer.emit(new CustomError().name,
      `${name} ${translator.translateText('must be a number, given:')} ${typeof num}`);
    return new CustomError().emit();
  }
  return Number(num);
};

export const expectBarrierOffset = (barrier, CustomError = BlocklyError) => {
  if (barrier.match(/^[-+]\d+$/) === null) {
    observer.emit(new CustomError().name,
      translator.translateText('Please use appropriate barrier offset block for barrier offsets'));
    return new CustomError().emit();
  }
  return barrier;
};
