import Observer from '../../common/utils/observer';
import Interpreter from './Interpreter';
import TicksService from '../common/TicksService';
import { generateLiveApiInstance } from '../../common/appId';

export const createScope = () => {
    const observer = new Observer();
    const api = generateLiveApiInstance();

    const ticksService = new TicksService(api);

    return { observer, api, ticksService };
};

export const createInterpreter = () => new Interpreter();
