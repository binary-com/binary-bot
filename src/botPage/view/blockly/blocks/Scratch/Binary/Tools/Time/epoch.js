import { translate } from '../../../../../../../../common/i18n';

Blockly.Blocks.epoch = {
    init() {
        this.jsonInit({
            message0       : translate('Seconds Since Epoch'),
            output         : 'Number',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            tooltip        : translate('Returns the epoch time (seconds since epoch)'),
        });
    },
};

Blockly.JavaScript.epoch = () => ['Bot.getTime()', Blockly.JavaScript.ORDER_ATOMIC];
