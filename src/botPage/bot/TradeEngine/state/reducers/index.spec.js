import signal from './';
import * as constants from '../constants';

let state;

describe('signal reducers', () => {
    it('initial state', () => {
        expect((state = signal(undefined, { type: constants.INVALID_ACTION }))).toEqual({
            scope         : constants.STOP,
            proposalsReady: false,
        });
    });
    it('START signal', () => {
        expect((state = signal(undefined, { type: constants.START }))).toEqual({
            scope         : constants.BEFORE_PURCHASE,
            proposalsReady: false,
        });
    });
    it('PROPOSALS_READY signal', () => {
        expect((state = signal(state, { type: constants.PROPOSALS_READY }))).toEqual({
            scope         : constants.BEFORE_PURCHASE,
            proposalsReady: true,
        });
    });
    it('PURCHASE_SUCCESSFUL signal', () => {
        expect((state = signal(state, { type: constants.PURCHASE_SUCCESSFUL }))).toEqual({
            scope         : constants.DURING_PURCHASE,
            proposalsReady: true,
            openContract  : false,
        });
    });
    it('CLEAR_PROPOSALS signal', () => {
        expect((state = signal(state, { type: constants.CLEAR_PROPOSALS }))).toEqual({
            scope         : constants.DURING_PURCHASE,
            proposalsReady: false,
            openContract  : false,
        });
    });
    it('OPEN_CONTRACT signal', () => {
        expect((state = signal(state, { type: constants.OPEN_CONTRACT }))).toEqual({
            scope         : constants.DURING_PURCHASE,
            proposalsReady: false,
            openContract  : true,
        });
    });
    it('PROPOSALS_READY signal', () => {
        expect((state = signal(state, { type: constants.PROPOSALS_READY }))).toEqual({
            scope         : constants.DURING_PURCHASE,
            proposalsReady: true,
            openContract  : true,
        });
    });
    it('SOLD signal', () => {
        expect((state = signal(state, { type: constants.SELL }))).toEqual({
            scope         : constants.STOP,
            proposalsReady: true,
        });
    });
    it('NEW_TICK action', () => {
        expect((state = signal(state, { type: constants.NEW_TICK, payload: '123' }))).toEqual({
            scope         : constants.STOP,
            proposalsReady: true,
            newTick       : '123',
        });
    });
});
