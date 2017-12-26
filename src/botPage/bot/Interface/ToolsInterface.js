import CandleInterface from './CandleInterface';
import MiscInterface from './MiscInterface';
import IndicatorsInterface from './IndicatorsInterface';

// prettier-ignore
export default Interface => class extends IndicatorsInterface(
    MiscInterface(CandleInterface(Interface))) {
    getToolsInterface() {
        return {
            getTime: () => parseInt(new Date().getTime() / 1000),
            ...this.getCandleInterface(),
            ...this.getMiscInterface(),
            ...this.getIndicatorsInterface(),
        };
    }
};
