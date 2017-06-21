import Observer from 'binary-common-utils/lib/observer';
import { LiveApi } from 'binary-live-api';
import websocket from 'ws';
import Interpreter from './Interpreter';
import TicksService from '../common/TicksService';

export const createScope = () => {
    const observer = new Observer();
    const api = new LiveApi({
        websocket,
        appId: 1169,
    });

    const ticksService = new TicksService(api);

    return { observer, api, ticksService };
};

export const createInterpreter = () => new Interpreter();
