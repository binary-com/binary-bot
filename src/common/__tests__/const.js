/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import _const from '../const';

describe('Const', () => {
  it('Const should contain all const defs', () => {
    expect(_const).to.have.all.keys([
      'lists',
      'opposites',
      'hasSecondBarrierOffset',
      'hasBarrierOffset',
      'hasPrediction',
      'conditionsCategory',
      'conditionsCategoryName',
      'conditions',
      'barrierTypes',
      'durationTypes',
    ]);
  });
});
