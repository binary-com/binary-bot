import * as constants from '../constants';

const dispatchIfScopeIs = ({ dispatch, getState, data, scope }) => {
    const { scope: currentScope } = getState();
    if (currentScope === scope) {
        dispatch(data);
    }
};

const dispatchIfScopeIsBeforePurchase = args => dispatchIfScopeIs({ ...args, scope: constants.BEFORE_PURCHASE });

const dispatchIfBeforePurchaseReady = args => {
    const { getState } = args;
    const { ticksReady, proposalsReady } = getState();
    if (ticksReady && proposalsReady) {
        dispatchIfScopeIsBeforePurchase(args);
    }
};

export const start = () => (dispatch, getState) =>
    dispatchIfScopeIs({ dispatch, getState, data: constants.START, scope: constants.STOP });

export const ticksReady = () => (dispatch, getState) =>
    dispatchIfScopeIsBeforePurchase({ dispatch, getState, data: constants.TICKS_READY });

export const proposalsReady = () => (dispatch, getState) =>
    dispatchIfScopeIsBeforePurchase({ dispatch, getState, data: constants.PROPOSALS_READY });

export const purchaseSuccessful = () => (dispatch, getState) =>
    dispatchIfBeforePurchaseReady({ dispatch, getState, data: constants.PURCHASE_SUCCESSFUL });

export const openContractReceived = () => (dispatch, getState) =>
    dispatchIfBeforePurchaseReady({ dispatch, getState, data: constants.OPEN_CONTRACT });

export const sell = () => (dispatch, getState) => {
    const { openContract } = getState();
    if (openContract) {
        dispatchIfScopeIs({ dispatch, getState, data: constants.STOP, scope: constants.DURING_PURCHASE });
    }
};
