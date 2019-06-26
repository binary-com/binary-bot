import { LiveApi } from 'binary-live-api';
import Interpreter from '../bot/Interpreter';
import TicksService from '../common/TicksService';
import { observer as globalObserver } from '../../common/utils/observer';

class Bot {
    constructor() {
        this.observer = globalObserver;
        this.api = new LiveApi({ appId: 1 });
        this.ticksService = new TicksService(this.api);

        this.interpreter = new Interpreter({
            observer    : this.observer,
            api         : this.api,
            ticksService: this.ticksService,
        });
    }
    run(code) {
        const result = this.interpreter.run(code);
        result.catch(e => {
            globalObserver.emit('Error', e);
        });
        return result;
    }
}

export default Bot;
