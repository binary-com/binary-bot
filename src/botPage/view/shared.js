import filesaver from 'file-saver';
import _Symbol from '../common/symbolApi';
import TicksService from '../common/TicksService';
import { binaryApi } from '../../common/appId';

export const symbolApi = new _Symbol(binaryApi);

export const symbolPromise = () => new Promise(resolve => symbolApi.initPromise.then(() => resolve()));

export const ticksService = new TicksService(binaryApi.api);

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
