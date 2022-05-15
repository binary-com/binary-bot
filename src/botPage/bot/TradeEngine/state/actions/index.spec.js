import * as constants from '../constants';
import * as actions from './';

const getDispatchFromAction = ({ action, state }) => {
    const dispatch = jest.fn();
    action()(dispatch, () => state);
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
            state: { scope: constants.BEFORE_PURCHASE, proposalsReady: true },
        }),
    isNotReady: action => notToBeCalled({ action, state: { scope: constants.BEFORE_PURCHASE, proposalsReady: false } }),
};

describe('response actions', () => {
    it('START is fired if the scope is STOP', () => {
        toBeCalledWith({
            action    : actions.start,
            calledWith: { type: constants.START },
            state     : { scope: constants.STOP },
        });
    });
    it('START is not fired if the scope is not STOP', () => {
        notToBeCalled({ action: actions.start, state: { scope: constants.BEFORE_PURCHASE } });
    });
    it('PROPOSALS_READY is fired', () => {
        expect(actions.proposalsReady()).toEqual({ type: constants.PROPOSALS_READY });
    });
    it('CLEAR_PROPOSALS is fired', () => {
        expect(actions.clearProposals()).toEqual({ type: constants.CLEAR_PROPOSALS });
    });
    it('PURCHASE_SUCCESSFUL is fired if BEFORE_PURCHASE is ready', () => {
        beforePurchase.isReady({
            action    : actions.purchaseSuccessful,
            calledWith: { type: constants.PURCHASE_SUCCESSFUL },
        });
    });
    it('PURCHASE_SUCCESSFUL is not fired if BEFORE_PURCHASE is not ready', () => {
        beforePurchase.isNotReady(actions.purchaseSuccessful);
    });
    it('OPEN_CONTRACT is fired if BEFORE_PURCHASE is ready or scope is DURING_PURCHASE', () => {
        beforePurchase.isReady({ action: actions.openContractReceived, calledWith: { type: constants.OPEN_CONTRACT } });
        toBeCalledWith({
            action    : actions.openContractReceived,
            calledWith: { type: constants.OPEN_CONTRACT },
            state     : { scope: constants.DURING_PURCHASE, openContract: false },
        });
    });
    it('OPEN_CONTRACT is not fired if BEFORE_PURCHASE is not ready and scope is not DURING_PURCHASE', () => {
        beforePurchase.isNotReady(actions.openContractReceived);
        notToBeCalled({ action: actions.openContractReceived, state: { scope: constants.STOP } });
    });
    it('SELL is fired if the scope is DURING_PURCHASE', () => {
        toBeCalledWith({
            action    : actions.sell,
            calledWith: { type: constants.SELL },
            state     : { scope: constants.DURING_PURCHASE, openContract: false },
        });
    });
    it('SELL is not fired the scope is not DURING_PURCHASE', () => {
        notToBeCalled({ action: actions.sell, state: { scope: constants.STOP } });
    });
});
