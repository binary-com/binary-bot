import * as constants from '../constants';

const initialState = {
    scope: constants.STOP,
};

const signal = (state = initialState, action) => {
    switch (action) {
        case constants.START:
            return {
                scope         : constants.BEFORE_PURCHASE,
                ticksReady    : false,
                proposalsReady: false,
            };
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
                scope       : constants.DURING_PURCHASE,
                openContract: false,
            };
        case constants.OPEN_CONTRACT:
            return {
                scope       : constants.DURING_PURCHASE,
                openContract: true,
            };
        case constants.SOLD:
            return {
                scope: constants.STOP,
            };
        default:
            return state;
    }
};

export default signal;
