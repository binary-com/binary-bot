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
};
Blockly.JavaScript.total_profit = () => ['Bot.getTotalProfit(false)', Blockly.JavaScript.ORDER_ATOMIC];

Blockly.Blocks.total_profit_string = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Total Profit String'));
        this.setOutput(true, 'String');
        this.setColour('#dedede');
        this.setTooltip(translate('Return the total profit (String)'));
        this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
    },
};
Blockly.JavaScript.total_profit_string = () => ['Bot.getTotalProfit(true)', Blockly.JavaScript.ORDER_ATOMIC];
