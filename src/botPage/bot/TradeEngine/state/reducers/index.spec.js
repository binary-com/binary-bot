import signal from './';
import * as constants from '../constants';

const initialState = {
  scope: constants.BEFORE_PURCHASE,
  ticksReady: false,
  proposalsReady: false,
};

let state;

describe('signal reducers', () => {
  it('initial state', () => {
    expect((state = signal(undefined, constants.INVALID_ACTION))).toEqual(
      initialState,
    );
  });
  it('TICKS_READY signal', () => {
    expect((state = signal(state, constants.TICKS_READY))).toEqual({
      scope: constants.BEFORE_PURCHASE,
      ticksReady: true,
      proposalsReady: false,
    });
  });
  it('PROPOSALS_READY signal', () => {
    expect((state = signal(state, constants.PROPOSALS_READY))).toEqual({
      scope: constants.BEFORE_PURCHASE,
      ticksReady: true,
      proposalsReady: true,
    });
  });
  it('PURCHASE_SUCCESSFUL signal', () => {
    expect((state = signal(state, constants.PURCHASE_SUCCESSFUL))).toEqual({
      scope: constants.DURING_PURCHASE,
      openContract: false,
    });
  });
  it('OPEN_CONTRACT signal', () => {
    expect((state = signal(state, constants.OPEN_CONTRACT))).toEqual({
      scope: constants.DURING_PURCHASE,
      openContract: true,
    });
  });
  it('SOLD signal', () => {
    expect((state = signal(state, constants.SOLD))).toEqual(initialState);
  });
});
