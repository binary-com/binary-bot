import filesaver from 'file-saver';
import Observer from '../../common/utils/observer';
import { generateLiveApiInstance } from '../../common/appId';
import _Symbol from '../common/symbolApi';
import TicksService from '../common/TicksService';

let tmpApi = generateLiveApiInstance();

export const symbolApi = new _Symbol(tmpApi);

export const symbolPromise = new Promise(resolve => {
    symbolApi.initPromise.then(() => {
        tmpApi.disconnect();
        tmpApi = null;
        resolve();
    });
});

export const ticksService = new TicksService(generateLiveApiInstance());

export const createScope = () => {
    const api = generateLiveApiInstance();
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

export const restrictInputCharacter = ({ whitelistRegEx, input }) => input.match(new RegExp(whitelistRegEx));
