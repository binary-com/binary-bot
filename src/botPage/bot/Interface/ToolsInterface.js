import CandleInterface from './CandleInterface';
import MiscInterface from './MiscInterface';
import IndicatorsInterface from './IndicatorsInterface';
import WebhookInterface from './WebhookInterface';

// prettier-ignore
export default Interface => class extends IndicatorsInterface(
    MiscInterface(CandleInterface(WebhookInterface(Interface)))) {
    getToolsInterface() {
        return {
            getTime: () => parseInt(new Date().getTime() / 1000),
            ...this.getCandleInterface(),
            ...this.getMiscInterface(),
            ...this.getIndicatorsInterface(),
            ...this.getWebhookInterface(),
        };
    }
};
