import filesaver from 'file-saver';
import Observer from 'binary-common-utils/lib/observer';
import { setAppId } from '../../common/appId';
import { load as loadLang } from '../../common/lang';
import _Symbol from '../common/symbolApi';
import TicksService from '../common/TicksService';
import { createApi } from '../bot/CliTools';

loadLang();

setAppId();

let tmpApi = createApi();

export const symbolApi = new _Symbol(tmpApi);

export const symbolPromise = new Promise(resolve => {
    symbolApi.initPromise.then(() => {
        tmpApi.disconnect();
        tmpApi = null;
        resolve();
    });
});

export const ticksService = new TicksService(createApi());

export const createScope = () => {
    const api = createApi();
    const observer = new Observer();

    return { observer, api, ticksService, symbolApi };
};

export const appendRow = (trade, state) => ({
    id  : state.id + 1,
    rows: [
        ...state.rows,
        {
            ...trade,
            id: state.id + 1,
        },
    ],
});

export const updateRow = (prevRowIndex, trade, state) => ({
    id  : state.id,
    rows: [
        ...state.rows.slice(0, prevRowIndex),
        {
            ...trade,
            id: state.id,
        },
    ],
});

export const saveAs = ({ data, filename, type }) => {
    const blob = new Blob([data], { type });
    filesaver.saveAs(blob, filename);
};
