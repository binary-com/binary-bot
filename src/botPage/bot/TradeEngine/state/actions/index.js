import * as constants from '../constants';

export const ticksReady = () => (dispatch, getState) => {
  const { scope } = getState();
  if (scope === constants.BEFORE_PURCHASE) {
    dispatch(constants.TICKS_READY);
  }
};
