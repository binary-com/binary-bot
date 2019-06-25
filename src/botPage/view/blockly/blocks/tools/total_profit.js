// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4
import { translate } from '../../../../../common/i18n';

Blockly.Blocks.total_profit = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Total Profit'));
        this.setOutput(true, 'Number');
        this.setColour('#dedede');
        this.setTooltip(translate('Returns the total profit'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
    onchange: ev => {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        if (ev.type === Blockly.Events.MOVE) {
            const rootBlock = this.getRootBlock();

            if (rootBlock.type === 'trade') {
                this.unplug();
            }
        }
    },
};
Blockly.JavaScript.total_profit = () => ['Bot.getTotalProfit()', Blockly.JavaScript.ORDER_ATOMIC];
