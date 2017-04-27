import * as constants from '../constants';

const initialState = {
  scope: constants.BEFORE_PURCHASE,
  ticksReady: false,
  proposalsReady: false,
};

const signal = (state = initialState, action) => {
  switch (action) {
    case constants.TICKS_READY:
      return {
        ...state,
        ticksReady: true,
      };
    case constants.PROPOSALS_READY:
      return {
        ...state,
        proposalsReady: true,
      };
    case constants.PURCHASE_SUCCESSFUL:
      return {
        scope: constants.DURING_PURCHASE,
        openContract: false,
      };
    case constants.OPEN_CONTRACT:
      return {
        scope: constants.DURING_PURCHASE,
        openContract: true,
      };
    case constants.SOLD:
      // Make a loop
      return initialState;
    default:
      return state;
  }
};

export default signal;
