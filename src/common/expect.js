import { translator } from './translator';
import { BlocklyError } from './error';

export const notEmptyArray = (array, CustomError = BlocklyError) => {
  if (array && array instanceof Array && array.length) {
    return array;
  }
  return new CustomError(
    `${translator.translateText('Expected non-empty array, given:')} ${typeof array}`).emit();
};

export const ohlc = (obj, CustomError = BlocklyError) => {
  if (obj && obj instanceof Object &&
    !isNaN(obj.open * obj.high * obj.low * obj.close)) {
    return obj;
  }
  return new CustomError(
    `${translator.translateText('Expected candle object, given:')} ${typeof obj}`).emit();
};

export const tick = (obj, CustomError = BlocklyError) => {
  if (obj && obj instanceof Object && obj.quote) {
    return obj;
  }
  return new CustomError(
    `${translator.translateText('Expected tick, given:')} ${typeof obj}`).emit();
};

// runtime

export const number = (name, num, CustomError = BlocklyError) => {
  if (isNaN(parseFloat(num)) || isNaN(Number(num))) {
    return new CustomError(
      `${name} ${translator.translateText('must be a number, given:')} ${typeof num}`).emit();
  }
  return Number(num);
};

export const barrierOffset = (num, CustomError = BlocklyError) => {
  number('barrier offset', num, CustomError);
  if (num === 0) {
    return new CustomError(
      `barrier offset ${translator.translateText('cannot be zero.')}`).emit();
  }
  return `${num < 0 ? '' : '+'}${num}`;
};

export default {
  notEmptyArray,
  ohlc,
  tick,
  number,
  barrierOffset,
};
