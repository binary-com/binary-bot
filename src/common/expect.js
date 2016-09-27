import { observer } from 'binary-common-utils/lib/observer';
import { translator } from './translator';
import { BlocklyError } from './error';

export const expectNonEmptyArray = (array) => {
  if (array && array instanceof Array && array.length) {
    return array;
  }
  observer.emit('blockly.error',
    `${translator.translateText('Expected non-empty array, given:')} ${typeof array}`);
  throw new BlocklyError();
};

export const expectOhlc = (ohlc) => {
  if (ohlc && ohlc instanceof Object &&
    ohlc.open && ohlc.high && ohlc.low && ohlc.close) {
    return ohlc;
  }
  observer.emit('blockly.error',
    `${translator.translateText('Expected candle object, given:')} ${typeof ohlc}`);
  throw new BlocklyError();
};

export const expectNumber = (name, num) => {
  if (isNaN(parseFloat(num)) || isNaN(Number(num))) {
    observer.emit('blockly.error',
      `${name} ${translator.translateText('must be a number, given:')} ${num}`);
    throw new BlocklyError();
  }
  return Number(num);
};

export const expectBarrierOffset = (barrier) => {
  if (barrier.match(/^[-+]\d+$/) === null) {
    observer.emit('blockly.error',
      translator.translateText('Please use appropriate barrier offset block for barrier offsets'));
    throw new BlocklyError();
  }
  return barrier;
};
