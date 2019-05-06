import { translate } from '../../../../../../common/i18n';

Blockly.Blocks.logic_boolean = {
    init() {
        this.jsonInit({
            message0: '%1',
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'BOOL',
                    options: [[translate('true'), 'TRUE'], [translate('false'), 'FALSE']],
                },
            ],
            output         : 'Boolean',
            outputShape    : Blockly.OUTPUT_SHAPE_HEXAGONAL,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
            category       : Blockly.Categories.operators,
        });
    },
};

Blockly.JavaScript.logic_boolean = block => {
    const code = block.getFieldValue('BOOL') === 'TRUE' ? 'true' : 'false';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
