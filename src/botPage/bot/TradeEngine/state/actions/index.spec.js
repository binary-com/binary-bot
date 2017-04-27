import * as constants from '../constants';
import * as actions from './';

const getDispatchFromAction = ({ action, state }) => {
    const dispatch = jest.fn();
    const thunk = action();
    thunk(dispatch, () => state);
    return dispatch;
};

const toBeCalledWith = args => expect(getDispatchFromAction(args)).toBeCalledWith(args.calledWith);

const notToBeCalled = args => expect(getDispatchFromAction(args)).not.toBeCalled();

const beforePurchase = {
    correctScope  : args => toBeCalledWith({ ...args, state: { scope: constants.BEFORE_PURCHASE } }),
    incorrectScope: action => notToBeCalled({ action, state: { scope: constants.DURING_PURCHASE } }),
    isReady       : args =>
        toBeCalledWith({
            ...args,
            state: { scope: constants.BEFORE_PURCHASE, ticksReady: true, proposalsReady: true },
        }),
    isNotReady: action =>
        notToBeCalled({ action, state: { scope: constants.BEFORE_PURCHASE, ticksReady: false, proposalsReady: true } }),
};

describe('response actions', () => {
    it('START is fired if the scope is STOP', () => {
        toBeCalledWith({ action: actions.start, calledWith: constants.START, state: { scope: constants.STOP } });
    });
    it('START is not fired if the scope is not STOP', () => {
        notToBeCalled({ action: actions.start, state: { scope: constants.BEFORE_PURCHASE } });
    });
    it('TICKS_READY is fired if the scope is BEFORE_PURCHASE', () => {
        beforePurchase.correctScope({ action: actions.ticksReady, calledWith: constants.TICKS_READY });
    });
    it('TICKS_READY is not fired if the scope is not BEFORE_PURCHASE', () => {
        beforePurchase.incorrectScope(actions.ticksReady);
    });
    it('PROPOSALS_READY is fired if the scope is BEFORE_PURCHASE', () => {
        beforePurchase.correctScope({ action: actions.proposalsReady, calledWith: constants.PROPOSALS_READY });
    });
    it('PROPOSALS_READY is not fired if the scope is not BEFORE_PURCHASE', () => {
        beforePurchase.incorrectScope(actions.proposalsReady);
    });
    it('PURCHASE_SUCCESSFUL is fired if BEFORE_PURCHASE is ready', () => {
        beforePurchase.isReady({ action: actions.purchaseSuccessful, calledWith: constants.PURCHASE_SUCCESSFUL });
    });
    it('PURCHASE_SUCCESSFUL is not fired if BEFORE_PURCHASE is not ready', () => {
        beforePurchase.isNotReady(actions.purchaseSuccessful);
    });
    it('OPEN_CONTRACT is fired if BEFORE_PURCHASE is ready', () => {
        beforePurchase.isReady({ action: actions.openContractReceived, calledWith: constants.OPEN_CONTRACT });
    });
    it('OPEN_CONTRACT is not fired if BEFORE_PURCHASE is not ready', () => {
        beforePurchase.isNotReady(actions.openContractReceived);
    });
    it('SOLD is fired if DURING_PURCHASE is ready', () => {
        toBeCalledWith({
            action    : actions.sell,
            calledWith: constants.STOP,
            state     : { scope: constants.DURING_PURCHASE, openContract: true },
        });
    });
    it('SOLD is not fired if DURING_PURCHASE is not ready', () => {
        notToBeCalled({ action: actions.sell, state: { scope: constants.DURING_PURCHASE, openContract: false } });
    });
});
