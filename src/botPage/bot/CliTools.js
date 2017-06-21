import Observer from 'binary-common-utils/lib/observer';
import { LiveApi } from 'binary-live-api';
import { get as getStorage } from 'binary-common-utils/lib/storageManager';
import Interpreter from './Interpreter';
import TicksService from '../common/TicksService';

export const createApi = () =>
    new LiveApi({
        // eslint-disable-next-line global-require
        websocket: typeof window === 'undefined' ? require('ws') : undefined,
        language : getStorage('lang') || 'en',
        appId    : getStorage('appId') || 1,
    });

export const createScope = () => {
    const observer = new Observer();
    const api = createApi();

    const ticksService = new TicksService(api);

    return { observer, api, ticksService };
};

export const createInterpreter = () => new Interpreter();
