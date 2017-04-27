import * as constants from '../constants';
import * as actions from './';

describe('response actions', () => {
  it('TICKS_READY is fired if the scope is BEFORE_PURCHASE', () => {
    const dispatch = jest.fn();
    const thunk = actions.ticksReady();
    thunk(dispatch, () => ({ scope: constants.BEFORE_PURCHASE }));
    expect(dispatch).toBeCalledWith(constants.TICKS_READY);
  });
  it('TICKS_READY is not fired if the scope is not BEFORE_PURCHASE', () => {
    const dispatch = jest.fn();
    const thunk = actions.ticksReady();
    thunk(dispatch, () => ({ scope: constants.DURING_PURCHASE }));
    expect(dispatch).not.toBeCalled();
  });
});
