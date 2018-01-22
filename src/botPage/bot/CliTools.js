import Observer from 'binary-common-utils/lib/observer';
import { LiveApi } from 'binary-live-api';
import { get as getStorage } from 'binary-common-utils/lib/storageManager';
import websocket from 'ws';
import Interpreter from './Interpreter';
import TicksService from '../common/TicksService';
import { getWebSocketURL, getDefaultEndpoint } from '../../common/appId';

export const createApi = () =>
    new LiveApi({
        // eslint-disable-next-line global-require
        apiUrl  : getWebSocketURL(),
        websocket,
        language: getStorage('lang') || 'en',
        appId   : getStorage('config.app_id') || getDefaultEndpoint().appId,
    });

export const createScope = () => {
    const observer = new Observer();
    const api = createApi();

    const ticksService = new TicksService(api);

    return { observer, api, ticksService };
};

export const createInterpreter = () => new Interpreter();
