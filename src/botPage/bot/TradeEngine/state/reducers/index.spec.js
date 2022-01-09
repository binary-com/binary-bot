import signal from '.';
import * as constants from '../constants';

let state;

describe('signal reducers', () => {
    it('initial state', () => {
        expect((state = signal({ type: constants.INVALID_ACTION }))).toEqual({
            scope         : constants.STOP,
            proposalsReady: false,
        });
    });
    it('START signal', () => {
        expect((state = signal({ type: constants.START }))).toEqual({
            scope         : constants.BEFORE_PURCHASE,
            proposalsReady: false,
        });
    });
    it('PROPOSALS_READY signal', () => {
        expect((state = signal({ type: constants.PROPOSALS_READY }, state))).toEqual({
            scope         : constants.BEFORE_PURCHASE,
            proposalsReady: true,
        });
    });
    it('PURCHASE_SUCCESSFUL signal', () => {
        expect((state = signal({type: constants.PURCHASE_SUCCESSFUL }, state))).toEqual({
            scope         : constants.DURING_PURCHASE,
            proposalsReady: true,
            openContract  : false,
        });
    });
    it('CLEAR_PROPOSALS signal', () => {
        expect((state = signal({type: constants.CLEAR_PROPOSALS }, state))).toEqual({
            scope         : constants.DURING_PURCHASE,
            proposalsReady: false,
            openContract  : false,
        });
    });
    it('OPEN_CONTRACT signal', () => {
        expect((state = signal({type: constants.OPEN_CONTRACT }, state))).toEqual({
            scope         : constants.DURING_PURCHASE,
            proposalsReady: false,
            openContract  : true,
        });
    });
    it('PROPOSALS_READY signal', () => {
        expect((state = signal({ type: constants.PROPOSALS_READY }, state))).toEqual({
            scope         : constants.DURING_PURCHASE,
            proposalsReady: true,
            openContract  : true,
        });
    });
    it('SOLD signal', () => {
        expect((state = signal({ type: constants.SELL }, state))).toEqual({
            scope         : constants.STOP,
            proposalsReady: true,
        });
    });
    it('NEW_TICK action', () => {
        expect((state = signal({ type: constants.NEW_TICK, payload: '123' }, state))).toEqual({
            scope         : constants.STOP,
            proposalsReady: true,
            newTick       : '123',
        });
    });
});
