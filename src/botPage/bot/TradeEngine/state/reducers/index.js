import * as constants from '../constants';

const initialState = {
    scope         : constants.STOP,
    proposalsReady: false,
};

const signal = (state = initialState, action) => {
    switch (action.type) {
        case constants.START:
            return {
                scope         : constants.BEFORE_PURCHASE,
                proposalsReady: state.proposalsReady,
            };
        case constants.PROPOSALS_READY:
            return {
                ...state,
                proposalsReady: true,
            };
        case constants.CLEAR_PROPOSALS:
            return {
                ...state,
                proposalsReady: false,
            };
        case constants.PURCHASE_SUCCESSFUL:
            return {
                scope         : constants.DURING_PURCHASE,
                openContract  : false,
                proposalsReady: state.proposalsReady,
            };
        case constants.OPEN_CONTRACT:
            return {
                scope         : constants.DURING_PURCHASE,
                openContract  : true,
                proposalsReady: state.proposalsReady,
            };
        case constants.SELL:
            return {
                scope         : constants.STOP,
                proposalsReady: state.proposalsReady,
            };
        case constants.NEW_TICK:
            return {
                ...state,
                newTick: action.payload,
            };
        default:
            return state;
    }
};

export default signal;
