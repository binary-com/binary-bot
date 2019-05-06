import { translate } from '../../../../../../../common/i18n';

Blockly.Blocks.lists_isEmpty = {
    init() {
        this.jsonInit({
            message0: translate('%1 is empty'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'VALUE',
                },
            ],
            output         : 'Boolean',
            outputShape    : Blockly.OUTPUT_SHAPE_HEXAGONAL,
            colour         : Blockly.Colours.Binary.colour,
            colourSecondary: Blockly.Colours.Binary.colourSecondary,
            colourTertiary : Blockly.Colours.Binary.colourTertiary,
        });
    },
};

Blockly.JavaScript.lists_isEmpty = block => {
    const list = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || '[]';

    const code = `!${list}.length`;
    return [code, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};
