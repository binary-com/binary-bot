import { translate } from '../../../../../../../../common/i18n';

Blockly.Blocks.total_profit = {
    init() {
        this.jsonInit({
            message0       : translate('Total Profit'),
            output         : 'Number',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Returns the total profit'),
        });
    },
};

Blockly.JavaScript.total_profit = () => ['Bot.getTotalProfit()', Blockly.JavaScript.ORDER_ATOMIC];
