import { observer as globalObserver } from '../../../common/utils/observer';

export default Interface =>
    class extends Interface {
        getMiscInterface() {
            return {
                notify        : args => globalObserver.emit('Notify', args),
                getTotalRuns  : () => this.tradeEngine.getTotalRuns(),
                getBalance    : type => this.tradeEngine.getBalance(type),
                getTotalProfit: () => this.tradeEngine.getTotalProfit(),
            };
        }
    };
