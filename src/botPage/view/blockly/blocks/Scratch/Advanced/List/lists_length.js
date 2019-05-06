import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.lists_length = {
    init() {
        this.jsonInit({
            message0: translate('length of %1'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
            ],
            output         : 'Number',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });
    },
};

Blockly.JavaScript.lists_length = block => {
    const list = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || '[]';

    const code = `${list}.length`;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
};
